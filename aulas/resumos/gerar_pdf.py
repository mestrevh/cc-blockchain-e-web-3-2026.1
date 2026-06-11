import os
import re
from markdown_pdf import MarkdownPdf, Section

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_pdf = os.path.join(script_dir, "resumos_completos.pdf")
    
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
    # Usando CSS puro sem tags <style> para o markdown-pdf
    css_styles = """
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
    }
    
    summary {
        font-weight: 600;
        color: #2b6cb0;
        cursor: pointer;
        outline: none;
    }
    """
    
    # 3. Cria o conversor MarkdownPdf
    pdf = MarkdownPdf(toc_level=2)
    
    # Adiciona a capa/título como primeira seção
    cover_text = "# Resumos Consolidados - Blockchain e Web 3.0\n\n*Este documento unifica os resumos de estudo das aulas 1 a 14.*\n"
    pdf.add_section(Section(cover_text), user_css=css_styles)
    
    # 4. Adiciona cada arquivo markdown como uma seção individual (gera quebra de página automática)
    for file in files:
        file_path = os.path.join(script_dir, file)
        with open(file_path, "r", encoding="utf-8") as f:
            file_data = f.read()
            
        aula_num = extract_number(file)
        # Prefixa o conteúdo com o título da Aula
        section_text = f"# Aula {aula_num}\n\n{file_data}"
        
        pdf.add_section(Section(section_text), user_css=css_styles)
        print(f"Adicionada: {file}")
        
    print("Gerando o arquivo PDF...")
    try:
        pdf.save(output_pdf)
        print(f"\n[SUCESSO] PDF gerado com êxito em:\n{output_pdf}")
    except Exception as e:
        print(f"\n[ERRO] Ocorreu uma falha ao gerar o PDF.")
        print(f"Detalhes do erro: {e}")

if __name__ == "__main__":
    main()
