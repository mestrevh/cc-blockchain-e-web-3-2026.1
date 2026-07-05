// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/**
 * @title SurveillanceAudit
 * @author Projeto Academico - Blockchain e Web3 2026.1
 * @notice Livro-caixa imutavel de auditoria para alertas de um sistema de
 *         vigilancia com reconhecimento facial em condominios.
 *
 * @dev Motivacao de design (ver ARCHITECTURE.md para detalhes completos):
 *
 *      1. Privacidade / LGPD: nenhuma imagem ou dado biometrico e enviado
 *         a blockchain. A camera de borda (camada /ai) calcula localmente
 *         um hash SHA-256 da evidencia e apenas esse hash (32 bytes,
 *         armazenado como `bytes32`) e imutabilizado aqui. O hash serve
 *         como prova de integridade: qualquer alteracao posterior na
 *         evidencia original produzira um hash diferente, permitindo
 *         detectar adulteracao sem nunca expor a imagem em si.
 *
 *      2. Controle de acesso: apenas enderecos explicitamente autorizados
 *         (tipicamente a wallet de administracao do backend NestJS) podem
 *         escrever novos alertas. Isso impede que qualquer conta externa
 *         poluta ou forje o historico de auditoria, mas mantem a leitura
 *         publica para transparencia (qualquer sindico/auditor pode
 *         verificar o historico sem depender do backend).
 *
 *      3. Imutabilidade: nao existem funcoes de update ou delete. Uma vez
 *         registrado, um alerta permanece no contrato para sempre — esse e
 *         o proprio objetivo do projeto (impedir exclusao maliciosa de
 *         registros de seguranca).
 */
contract SurveillanceAudit {
    // ---------------------------------------------------------------------
    // Tipos
    // ---------------------------------------------------------------------

    /**
     * @notice Representa um evento de seguranca auditado.
     * @param id Identificador sequencial unico do alerta (comeca em 1).
     * @param cameraId Identificador da camera de borda que gerou o alerta
     *        (ex: "CAM-PORTARIA-01").
     * @param timestamp Momento da deteccao segundo o relogio do dispositivo
     *        de borda (unix epoch, em segundos). Distinto de `blockTimestamp`
     *        propositalmente: permite comparar "quando o evento ocorreu" com
     *        "quando foi imutabilizado", evidenciando eventual atraso de
     *        rede sem comprometer a prova de integridade.
     * @param alertType Categoria do alerta (ex: "PESSOA_NAO_AUTORIZADA",
     *        "MORADOR_RECONHECIDO"). Mantido como string (em vez de enum)
     *        para permitir que novas categorias sejam adicionadas na borda
     *        sem exigir upgrade do contrato.
     * @param imageHash Hash SHA-256 (32 bytes) da evidencia (imagem/frame)
     *        capturada pela borda. A imagem em si NUNCA e enviada on-chain.
     * @param registeredBy Endereco que efetivamente enviou a transacao de
     *        registro (a wallet de administracao do backend).
     * @param blockTimestamp Timestamp do bloco em que o alerta foi minerado,
     *        atribuido pela rede — nao pode ser falsificado pelo remetente.
     */
    struct Alert {
        uint256 id;
        string cameraId;
        uint256 timestamp;
        string alertType;
        bytes32 imageHash;
        address registeredBy;
        uint256 blockTimestamp;
    }

    // ---------------------------------------------------------------------
    // Estado
    // ---------------------------------------------------------------------

    /// @notice Endereco com poderes administrativos (deploy da conta owner).
    address public owner;

    /// @notice Enderecos autorizados a registrar novos alertas (write).
    mapping(address => bool) public authorizedSubmitters;

    /// @dev Armazenamento principal: id do alerta => dados do alerta.
    mapping(uint256 => Alert) private alerts;

    /// @dev Indice auxiliar para consulta eficiente por camera.
    mapping(string => uint256[]) private alertIdsByCamera;

    /// @notice Quantidade total de alertas registrados (tambem = ultimo id).
    uint256 public totalAlerts;

    // ---------------------------------------------------------------------
    // Eventos
    // ---------------------------------------------------------------------

    /// @notice Emitido sempre que um novo alerta e imutabilizado.
    /// @dev `cameraId` e `alertType` sao propositalmente NAO indexados:
    ///      tipos dinamicos (string) quando indexados armazenam apenas o
    ///      keccak256 do valor no topico do log, tornando impossivel
    ///      recuperar a string original a partir do evento. Mantendo-os
    ///      como dados (nao indexados), o backend consegue decodificar o
    ///      valor real ao escutar `AlertRegistered` via ethers.js.
    event AlertRegistered(
        uint256 indexed id,
        string cameraId,
        string alertType,
        bytes32 imageHash,
        uint256 timestamp,
        address indexed registeredBy,
        uint256 blockTimestamp
    );

    /// @notice Emitido quando um novo endereco passa a poder registrar alertas.
    event SubmitterAuthorized(address indexed submitter, address indexed authorizedBy);

    /// @notice Emitido quando um endereco perde a permissao de registrar alertas.
    event SubmitterRevoked(address indexed submitter, address indexed revokedBy);

    /// @notice Emitido na transferencia de administracao do contrato.
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // ---------------------------------------------------------------------
    // Erros customizados (mais baratos em gas do que strings de `require`)
    // ---------------------------------------------------------------------

    error NotOwner();
    error NotAuthorized();
    error ZeroAddress();
    error EmptyCameraId();
    error EmptyAlertType();
    error EmptyImageHash();
    error InvalidTimestamp();
    error AlertNotFound(uint256 id);

    // ---------------------------------------------------------------------
    // Modificadores
    // ---------------------------------------------------------------------

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyAuthorized() {
        if (!authorizedSubmitters[msg.sender]) revert NotAuthorized();
        _;
    }

    // ---------------------------------------------------------------------
    // Constructor
    // ---------------------------------------------------------------------

    /**
     * @dev Quem faz o deploy do contrato se torna `owner` e ja e
     *      automaticamente autorizado a registrar alertas — na pratica,
     *      essa e a wallet gerenciada pelo backend NestJS (camada /backend).
     */
    constructor() {
        owner = msg.sender;
        authorizedSubmitters[msg.sender] = true;
        emit SubmitterAuthorized(msg.sender, msg.sender);
    }

    // ---------------------------------------------------------------------
    // Funcoes de escrita (write)
    // ---------------------------------------------------------------------

    /**
     * @notice Registra de forma imutavel um novo alerta de seguranca.
     * @dev Restrito a enderecos autorizados (`onlyAuthorized`). Os
     *      parametros sao validados minimamente on-chain; validacoes de
     *      negocio mais ricas (ex: formato do cameraId) ficam a cargo do
     *      backend, que e a unica camada autorizada a chamar esta funcao.
     * @param cameraId Identificador da camera de borda.
     * @param timestamp Momento da deteccao (unix epoch, segundos) segundo a borda.
     * @param alertType Categoria do alerta.
     * @param imageHash Hash SHA-256 da evidencia capturada.
     * @return id Identificador sequencial atribuido ao alerta.
     */
    function registerAlert(
        string calldata cameraId,
        uint256 timestamp,
        string calldata alertType,
        bytes32 imageHash
    ) external onlyAuthorized returns (uint256 id) {
        if (bytes(cameraId).length == 0) revert EmptyCameraId();
        if (bytes(alertType).length == 0) revert EmptyAlertType();
        if (imageHash == bytes32(0)) revert EmptyImageHash();
        if (timestamp == 0) revert InvalidTimestamp();

        totalAlerts += 1;
        id = totalAlerts;

        alerts[id] = Alert({
            id: id,
            cameraId: cameraId,
            timestamp: timestamp,
            alertType: alertType,
            imageHash: imageHash,
            registeredBy: msg.sender,
            blockTimestamp: block.timestamp
        });

        alertIdsByCamera[cameraId].push(id);

        emit AlertRegistered(
            id,
            cameraId,
            alertType,
            imageHash,
            timestamp,
            msg.sender,
            block.timestamp
        );
    }

    // ---------------------------------------------------------------------
    // Funcoes de leitura (read / view)
    // ---------------------------------------------------------------------

    /// @notice Retorna um alerta pelo seu id sequencial.
    function getAlert(uint256 id) external view returns (Alert memory) {
        if (id == 0 || id > totalAlerts) revert AlertNotFound(id);
        return alerts[id];
    }

    /// @notice Retorna todos os alertas registrados, em ordem cronologica.
    /// @dev Adequado para o volume de um unico condominio nesta prova de
    ///      conceito. Em producao de larga escala, recomenda-se paginacao
    ///      (ver `getAlertsPaginated`) para evitar custo de RPC excessivo.
    function getAllAlerts() external view returns (Alert[] memory) {
        return _sliceAlerts(1, totalAlerts);
    }

    /**
     * @notice Retorna uma pagina de alertas, do id `offset` (inclusive)
     *         ate `offset + limit - 1`, respeitando o total existente.
     * @param offset Id inicial (1-based) da pagina.
     * @param limit Quantidade maxima de alertas a retornar.
     */
    function getAlertsPaginated(uint256 offset, uint256 limit)
        external
        view
        returns (Alert[] memory)
    {
        if (offset == 0) offset = 1;
        uint256 end = offset + limit - 1;
        if (end > totalAlerts) end = totalAlerts;
        return _sliceAlerts(offset, end);
    }

    /// @notice Retorna todos os alertas emitidos por uma camera especifica.
    function getAlertsByCamera(string calldata cameraId)
        external
        view
        returns (Alert[] memory)
    {
        uint256[] memory ids = alertIdsByCamera[cameraId];
        Alert[] memory result = new Alert[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            result[i] = alerts[ids[i]];
        }
        return result;
    }

    /// @dev Monta um array de alertas para o intervalo [from, to] (1-based, inclusive).
    function _sliceAlerts(uint256 from, uint256 to) private view returns (Alert[] memory) {
        if (totalAlerts == 0 || from > to) {
            return new Alert[](0);
        }
        uint256 length = to - from + 1;
        Alert[] memory result = new Alert[](length);
        for (uint256 i = 0; i < length; i++) {
            result[i] = alerts[from + i];
        }
        return result;
    }

    // ---------------------------------------------------------------------
    // Administracao (controle de acesso)
    // ---------------------------------------------------------------------

    /// @notice Autoriza um novo endereco a registrar alertas.
    function authorizeSubmitter(address submitter) external onlyOwner {
        if (submitter == address(0)) revert ZeroAddress();
        authorizedSubmitters[submitter] = true;
        emit SubmitterAuthorized(submitter, msg.sender);
    }

    /// @notice Revoga a permissao de um endereco para registrar alertas.
    function revokeSubmitter(address submitter) external onlyOwner {
        authorizedSubmitters[submitter] = false;
        emit SubmitterRevoked(submitter, msg.sender);
    }

    /// @notice Transfere a administracao do contrato para outro endereco.
    function transferOwnership(address newOwner) external onlyOwner {
        if (newOwner == address(0)) revert ZeroAddress();
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
