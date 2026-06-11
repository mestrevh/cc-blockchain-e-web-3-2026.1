import os
import re
import subprocess
import shutil

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_pdf = os.path.join(script_dir, "resumos_completos.pdf")
    temp_md = os.path.join(script_dir, "temp_combined_resumos.md")
    
    print("Iniciando a compilação dos resumos...")
    
    # 1. Encontra todos os arquivos aula*.md e ordena numericamente
    files = [f for f in os.listdir(script_dir) if f.startswith("aula") and f.endswith(".md")]
    
    def extract_number(filename):
        match = re.search(r"aula(\d+)\.md", filename)
        return int(match.group(1)) if match else 0
        
    files.sort(key=extract_number)
    
    if not files:
        print("[ERRO] Nenhum arquivo 'aula*.md' encontrado na pasta.")
        return
        
    print(f"Arquivos encontrados para compilação: {', '.join(files)}")
    
    # 2. Folha de estilo CSS personalizada para deixar o PDF com aspecto premium
    css_styles = """<style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
    
    body {
        font-family: 'Outfit', 'Segoe UI', Roboto, sans-serif;
        color: #2d3748;
        line-height: 1.6;
        font-size: 11pt;
    }
    
    h1, h2, h3, h4 {
        color: #1a365d;
        font-weight: 600;
        page-break-inside: avoid;
    }
    
    h1 {
        font-size: 24pt;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 8px;
        margin-top: 0;
    }
    
    h2 {
        font-size: 18pt;
        border-bottom: 1px solid #edf2f7;
        padding-bottom: 5px;
        margin-top: 24px;
    }
    
    h3 {
        font-size: 14pt;
        margin-top: 20px;
    }
    
    a {
        color: #2b6cb0;
        text-decoration: none;
    }
    
    code {
        font-family: 'Consolas', 'Courier New', monospace;
        background-color: #f7fafc;
        border: 1px solid #edf2f7;
        padding: 2px 5px;
        border-radius: 4px;
        font-size: 9.5pt;
        color: #c53030;
    }
    
    pre {
        background-color: #f7fafc;
        border: 1px solid #e2e8f0;
        padding: 12px;
        border-radius: 6px;
        overflow: auto;
        page-break-inside: avoid;
    }
    
    pre code {
        background-color: transparent;
        border: none;
        padding: 0;
        color: #2d3748;
        font-size: 9pt;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
        page-break-inside: avoid;
    }
    
    th, td {
        border: 1px solid #e2e8f0;
        padding: 8px 12px;
        text-align: left;
    }
    
    th {
        background-color: #f7fafc;
        color: #4a5568;
        font-weight: 600;
    }
    
    /* Estilização especial para os Flashcards / Details */
    details {
        background-color: #f7fafc;
        border: 1px solid #e2e8f0;
        border-left: 4px solid #4299e1;
        padding: 8px 12px;
        border-radius: 4px;
        margin: 8px 0;
        page-break-inside: avoid;
    }
    
    summary {
        font-weight: 600;
        color: #2b6cb0;
        cursor: pointer;
        outline: none;
    }
    
    summary::-webkit-details-marker {
        color: #4299e1;
    }
    
    /* Configuração de quebra de página */
    .page-break {
        page-break-after: always;
        break-after: page;
    }
    </style>
    """
    
    # 3. Une todos os arquivos markdown inserindo quebras de página
    combined_content = css_styles + "\n"
    combined_content += "# Resumos Consolidados - Blockchain e Web 3.0\n"
    combined_content += "*Este documento unifica os resumos de estudo das aulas 1 a 14.*\n\n"
    combined_content += "<div class='page-break'></div>\n\n"
    
    for index, file in enumerate(files):
        file_path = os.path.join(script_dir, file)
        with open(file_path, "r", encoding="utf-8") as f:
            file_data = f.read()
            
        # Adiciona o título da aula e seu conteúdo
        combined_content += f"# Aula {extract_number(file)}\n\n"
        combined_content += file_data + "\n\n"
        
        # Não adiciona quebra de página após o último arquivo
        if index < len(files) - 1:
            combined_content += "<div class='page-break'></div>\n\n"
            
    with open(temp_md, "w", encoding="utf-8") as f:
        f.write(combined_content)
        
    # 4. Verifica se o npx / Node está disponível para rodar o conversor
    if not shutil.which("npx"):
        print("[ERRO] O comando 'npx' não foi encontrado no sistema.")
        print("Certifique-se de que o Node.js está instalado e configurado no PATH.")
        return
        
    print("Gerando PDF usando o md-to-pdf...")
    try:
        # Executa md-to-pdf passando o arquivo temporário
        comando = ["npx", "--yes", "md-to-pdf", temp_md, "--output", output_pdf]
        resultado = subprocess.run(comando, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        print(f"\n[SUCESSO] PDF gerado com êxito em:\n{output_pdf}")
        
    except subprocess.CalledProcessError as e:
        print(f"\n[ERRO] Ocorreu uma falha ao executar a conversão para PDF.")
        print(f"Detalhes do erro:\n{e.stderr.decode('utf-8', errors='ignore')}")
    finally:
        # 5. Limpa o arquivo markdown temporário
        if os.path.exists(temp_md):
            os.remove(temp_md)

if __name__ == "__main__":
    main()
