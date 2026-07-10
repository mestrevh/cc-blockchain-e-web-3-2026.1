// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/**
 * @title IdentityRegistry
 * @author Smart Surveillance
 * @notice Contrato para cadastro de moradores e visitantes, respeitando a LGPD 
 *         ao armazenar apenas os hashes (SHA-256) das informacoes pessoais.
 */
contract IdentityRegistry {
    enum Role { NONE, RESIDENT, VISITOR }

    struct Identity {
        bytes32 identityHash; // Identificador unico da pessoa
        bytes32 nameHash;     // Hash do nome completo
        bytes32 docHash;      // Hash do CPF/RG
        bytes32 photoHash;    // Hash da foto
        Role role;            // 1 para Morador, 2 para Visitante
        uint256 expiration;   // 0 = Ilimitado, ou timestamp de limite (1 dia)
        address registeredBy; // Carteira MetaMask do usuario que cadastrou
        uint256 createdAt;
    }

    // Armazenamento principal de identidades
    mapping(bytes32 => Identity) public identities;

    // Lista de identidades cadastradas por uma carteira especifica
    mapping(address => bytes32[]) public identitiesByWallet;

    event IdentityRegistered(
        bytes32 indexed identityHash,
        Role role,
        address indexed registeredBy,
        uint256 expiration
    );

    error IdentityAlreadyExists();
    error InvalidHash();

    /**
     * @notice Registra uma nova identidade.
     * @param nameHash Hash SHA-256 do nome completo
     * @param docHash Hash SHA-256 do documento (CPF/RG)
     * @param photoHash Hash SHA-256 da foto
     * @param isResident true para Morador (ilimitado), false para Visitante (1 dia)
     */
    function registerIdentity(
        bytes32 nameHash,
        bytes32 docHash,
        bytes32 photoHash,
        bool isResident
    ) external returns (bytes32) {
        if (nameHash == bytes32(0) || docHash == bytes32(0) || photoHash == bytes32(0)) {
            revert InvalidHash();
        }

        // Criamos o Hash de Identidade unico combinando o Hash do Documento e a Carteira
        bytes32 idHash = keccak256(abi.encodePacked(docHash, msg.sender));

        if (identities[idHash].createdAt != 0) {
            revert IdentityAlreadyExists();
        }

        Role role = isResident ? Role.RESIDENT : Role.VISITOR;
        uint256 expiration = isResident ? 0 : block.timestamp + 1 days;

        identities[idHash] = Identity({
            identityHash: idHash,
            nameHash: nameHash,
            docHash: docHash,
            photoHash: photoHash,
            role: role,
            expiration: expiration,
            registeredBy: msg.sender,
            createdAt: block.timestamp
        });

        identitiesByWallet[msg.sender].push(idHash);

        emit IdentityRegistered(idHash, role, msg.sender, expiration);

        return idHash;
    }

    function getIdentitiesByWallet(address wallet) external view returns (bytes32[] memory) {
        return identitiesByWallet[wallet];
    }
    
    function getIdentity(bytes32 idHash) external view returns (Identity memory) {
        return identities[idHash];
    }
}
