# Camada Borda (AI) — `edge_camera.py`

Camada 3 da arquitetura: Simulador de dispositivo Edge/IoT (câmera de vigilância).

## Propósito
Este módulo simula o ambiente local da câmera. Na vida real, este seria o hardware executando modelos de AI/Computer Vision (ex: YOLO, OpenCV) nos frames da câmera localmente. 
Para cumprir com as regras de projeto e com a **LGPD**, o payload enviado não contém nenhuma biometria, apenas um hash criptográfico (SHA-256) da evidência e os metadados textuais do evento.

## Como Executar

Este projeto utiliza o gerenciador de pacotes moderno `uv`.

```bash
cd ai

# 1. (Opcional se já adicionado) Garantir que as dependências existem no projeto
uv add requests

# 2. Executar o simulador via uv
uv run edge_camera.py
```

## Como Funciona
- O script usa `uv` para invocar o ambiente Python isolado.
- Gera um evento falso simulando a detecção, criando o `imageHash` da evidência via `hashlib.sha256()`.
- O payload é despachado via HTTP POST para o Backend local (`http://localhost:3000/alerts`). 
- Em caso de falha no servidor (Backend offline ou timeout), o script tratará as exceptions graciosamente.
