# ftr-pos-360-upload-widget-server

# 📦 Upload Widget Server

Este projeto é um backend completo para gerenciamento de upload de arquivos, desenvolvido com **Node.js**, **PostgreSQL** e **Cloudflare R2**.

## 🧰 Tecnologias utilizadas

- **Node.js** – plataforma principal
- **Fastify.js** – criação de rotas e middlewares
- **Cloudflare R2** – armazenamento de arquivos compatível com S3
- **PostgreSQL** – banco de dados relacional
- **Zod** – validação de dados
- **CSV Writer / Parser** – exportação e leitura de arquivos CSV
- **Multer / Streams do Node.js** – upload de arquivos via stream
- **Jest** – testes unitários e de integração
- **CI (Continuous Integration)** – execução automatizada de testes

---

## 🚀 Funcionalidades

- 📁 **Upload de arquivos** (imagens, relatórios, documentos)
- 📂 **Organização de uploads** por pastas e categorias
- 🔐 **Geração de nomes únicos** e sanitização de arquivos
- 🌐 **Listagem e exportação em CSV**
- 🧪 **Testes automatizados** com feedback rápido
- ⚙️ **Validações e tratamento de erros**
- 🧱 **Estrutura escalável e pronta para produção**

---

## 📸 Exemplo de uso (Upload)

```http
POST /upload
Content-Type: multipart/form-data

FormData:
  - file: imagem.png
