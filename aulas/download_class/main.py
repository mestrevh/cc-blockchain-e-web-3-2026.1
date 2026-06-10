import os
import yt_dlp

# 1. Cole aqui todos os links dos vídeos que você quer baixar
links_do_drive = [
    {"nome": "Aula 1 - Introdução à Blockchain (Parte 1).mp4", "url": "https://drive.google.com/file/d/1oTkSsDqf7Y1hTw3j0wxD68S9MNHi_UB4/view"},
    {"nome": "Aula 2 - Introdução à Blockchain (Parte 2).mp4", "url": "https://drive.google.com/file/d/13YbbjpLQeR8V42UD-mKG5TYR2MHeEoeO/view"},
    {"nome": "Aula 3 - Introdução à Blockchain (Parte 3).mp4", "url": "https://drive.google.com/file/d/1T5tf3_dSom046uhKaktF1M0OVRdbbCF0/view"},
    {"nome": "Aula 4 - Introdução à Blockchain (Parte 4).mp4", "url": "https://drive.google.com/file/d/1yQnjMTqN6KpvJfq-1SsfOMCRnc94dapa/view"},
    {"nome": "Aula 5 - Introdução à Blockchain (Parte 5).mp4", "url": "https://drive.google.com/file/d/1DznWwGN83zOdpFQBPAFZFycOvJsCmodM/view"},
    {"nome": "Aula 6 - Introdução à Blockchain (Parte 6).mp4", "url": "https://drive.google.com/file/d/1OCPBdSH5N7eY1ssyEV1xGGH0sW8pCx5-/view"},
    {"nome": "Aula 7 - Introdução à Web 3.0 (Parte 1).mp4", "url": "https://drive.google.com/file/d/1UawTEA6vBJoLwVctivPynoQyQfpmOHF7/view"},
    {"nome": "Aula 8 - Introdução à Web 3.0 (Parte 2).mp4", "url": "https://drive.google.com/file/d/1VMxVhnbi4FJP0dcfmdrqP5zR8xyJ2suM/view"},
    {"nome": "Aula 9 - Introdução à Web 3.0 (Parte 3).mp4", "url": "https://drive.google.com/file/d/1QwTx9dxvlJYz7b5l0roknDvkR5xo4eRb/view"},
    {"nome": "Aula 10 - Introdução à Web 3.0 (Parte 4).mp4", "url": "https://drive.google.com/file/d/1qtDrP4BueAxp2rQsmRoaUiKehX8GJPIE/view"},
    {"nome": "Aula 11 - Introdução à Web 3.0 (Parte 5).mp4", "url": "https://drive.google.com/file/d/1sfh3y2hWPN91QpmE1fLJtxC0ml92Zx_H/view"},
    {"nome": "Aula 12 - Introdução à Web 3.0 (Parte 6).mp4", "url": "https://drive.google.com/file/d/1I08Ud0dmclJ_m6pKGBfiDC62c0nasnZ7/view"},
    {"nome": "Aula 13 - Introdução à Web 3.0 (Parte 7).mp4", "url": "https://drive.google.com/file/d/1oR73jUApPvAN_5PzD1oOakQpesEPhAnP/view"},
    {"nome": "Aula 14 - Introdução à Web 3.0 (Parte 8).mp4", "url": "https://drive.google.com/file/d/1zF1I27FQBDjJK4DMXKP6K8ok0dCvRHV6/view"},
]

# Configura o diretório de destino para os vídeos
script_dir = os.path.dirname(os.path.abspath(__file__))
videos_dir = os.path.join(script_dir, "..", "videos")
os.makedirs(videos_dir, exist_ok=True)

# Caminho para o arquivo de cookies
cookies_path = os.path.join(script_dir, "cookies.txt")

if not os.path.exists(cookies_path):
    print(f"\n[ERRO] O arquivo '{cookies_path}' não foi encontrado.")
    print("Para baixar vídeos privados do Google Drive, você precisa exportar seus cookies.")
    print("Siga as instruções no README.md para obter este arquivo e salve-o nesta pasta.\n")
    exit(1)

# 2. Loop para baixar cada um da lista automaticamente
print(f"Iniciando o download de {len(links_do_drive)} arquivos para '{videos_dir}'...\n")

for indice, item in enumerate(links_do_drive):
    url = item["url"]
    nome_arquivo = item["nome"]
    
    print(f"[{indice + 1}/{len(links_do_drive)}] Processando arquivo: {nome_arquivo} ...")
    nome_saida = os.path.join(videos_dir, nome_arquivo)

    # Configurações do yt-dlp
    ydl_opts = {
        'cookiefile': cookies_path,
        'outtmpl': nome_saida,
        'quiet': False,
        'no_warnings': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        print("-" * 50)
    except Exception as e:
        print(f"Erro ao tentar baixar {nome_arquivo}: {e}")

print("\nTodos os downloads foram concluídos!")