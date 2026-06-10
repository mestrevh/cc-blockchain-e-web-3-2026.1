# Script de Download das Aulas

Este projeto contém um script Python (`main.py`) para baixar automaticamente as aulas hospedadas no Google Drive e organizá-las. 
Ele utiliza a biblioteca `yt-dlp` em conjunto com seus "Cookies" de acesso para permitir o download de vídeos privados (restritos a alunos).

## Passo 1: Obter o arquivo de Cookies

Como os vídeos não são públicos, o script precisa da sua permissão de login no Google.

1. Instale no seu navegador a extensão **Get cookies.txt LOCALLY** (disponível para Chrome e navegadores baseados nele).
2. Acesse o site do [Google Drive](https://drive.google.com) e certifique-se de estar logado na mesma conta que tem acesso aos vídeos da disciplina.
3. Clique no ícone da extensão no topo do seu navegador e clique em **Export**.
4. Ele vai baixar um arquivo de texto. Renomeie (caso não esteja com esse nome) para exatamente **`cookies.txt`**.
5. Mova este arquivo `cookies.txt` para dentro da pasta **`aulas/download_class/`** (no mesmo local onde está o `main.py`).

## Passo 2: Como Executar

Para rodar o script e baixar os vídeos utilizando o gerenciador `uv`, siga os passos abaixo no seu terminal:

1. **Navegue até a pasta do projeto**:
   ```bash
   cd aulas/download_class
   ```

2. **Execute o script**:
   Como este projeto utiliza o `uv` e nós configuramos o `yt-dlp` no arquivo `pyproject.toml`, você não precisa instalar nada manualmente. Basta rodar:
   ```bash
   uv run main.py
   ```
   *Na primeira vez que você rodar esse comando, o `uv` vai automaticamente atualizar o ambiente virtual dele, instalar o `yt-dlp` e logo em seguida executar o nosso código.*

## Onde os arquivos serão salvos?

Todos os vídeos serão baixados e salvos um nível acima desta pasta, no diretório `aulas/videos/`. 
O script automaticamente lerá cada link configurado e salvará o arquivo de vídeo (.mp4) já com o título da aula (exemplo: `Aula 1 - Introdução à Blockchain (Parte 1).mp4`).
