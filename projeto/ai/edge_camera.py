import time
import hashlib
import json
import uuid
import requests
import random
import logging
from typing import Dict, Any

# Configuração básica de logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Configurações do ambiente Edge
CAMERA_ID = "CAM-PORTARIA-01"
BACKEND_URL = "http://localhost:3000/alerts"

def generate_evidence_hash() -> str:
    """
    Gera um hash SHA-256 a partir de uma evidência (simulada).
    Na prática, isso seria o hash de um frame/imagem capturado pela câmera.
    A imagem NUNCA sai do dispositivo Edge para cumprir a LGPD.
    """
    # Simulando a captura de uma imagem gerando um ID aleatório
    dummy_image_data = f"frame_data_{uuid.uuid4()}".encode('utf-8')
    return hashlib.sha256(dummy_image_data).hexdigest()

def detect_event() -> Dict[str, Any]:
    """
    Simula o processamento do modelo de IA embarcado na câmera
    para detecção de reconhecimento facial ou intrusão.
    """
    event_types = ["PESSOA_NAO_AUTORIZADA", "MORADOR_RECONHECIDO", "PESSOA_AUTORIZADA"]
    event_type = random.choice(event_types)
    timestamp = int(time.time())
    
    image_hash = generate_evidence_hash()
    
    # Simula um hash de identidade da pessoa reconhecida
    # Na vida real, a IA tentaria combinar o rosto detectado com um banco local de hashes
    # Se nao achar, geraria um novo (ou enviaria um dummy para pessoa nao autorizada)
    dummy_identity_seed = f"identity_{random.randint(1, 5)}".encode('utf-8')
    identity_hash = hashlib.sha256(dummy_identity_seed).hexdigest()
    
    payload = {
        "cameraId": CAMERA_ID,
        "timestamp": timestamp,
        "alertType": event_type,
        "imageHash": f"0x{image_hash}", # O Solidity espera bytes32 formatado como hexa 0x
        "identityHash": f"0x{identity_hash}"
    }
    return payload

def send_alert(payload: Dict[str, Any]) -> None:
    """
    Envia o payload de alerta para a API Backend (NestJS).
    A API, possuidora da chave privada, assinará a transação para salvar na Blockchain.
    """
    try:
        logging.info(f"Enviando alerta para o Backend: {json.dumps(payload)}")
        # Timeout explícito conforme regras
        response = requests.post(BACKEND_URL, json=payload, timeout=5)
        
        if response.status_code in (200, 201):
            logging.info("✅ Alerta encaminhado com sucesso ao backend!")
        else:
            logging.error(f"❌ Falha ao processar alerta: Status {response.status_code} - {response.text}")
            
    except requests.exceptions.ConnectionError:
        logging.error("❌ Erro de Conexão: Backend indisponível.")
    except requests.exceptions.Timeout:
        logging.error("❌ Erro de Timeout: Backend demorou a responder.")
    except Exception as e:
        logging.error(f"❌ Erro Desconhecido durante envio: {str(e)}")

def run_simulation() -> None:
    """
    Inicia o loop contínuo do simulador da câmera Edge.
    """
    logging.info(f"Iniciando Simulador Câmera Edge: {CAMERA_ID}")
    logging.info("Hashes SHA-256 (conformidade LGPD) habilitados.")
    
    try:
        while True:
            # Simula a espera de um evento físico ocorrendo num intervalo de 5 a 15 segundos
            logging.info("Aguardando detecção de evento físico no local...")
            time.sleep(random.randint(5, 15))
            
            payload = detect_event()
            send_alert(payload)
            
    except KeyboardInterrupt:
        logging.info("\nSimulação encerrada manualmente (CTRL+C).")

if __name__ == "__main__":
    run_simulation()
