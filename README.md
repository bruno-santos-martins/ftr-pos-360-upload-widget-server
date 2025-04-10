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
- **CI (Continuous Integration)** – execução automatizada de testes Ao abrir Pr para main

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

🐳 Rodando o ambiente com Docker Compose
Para iniciar o ambiente com o banco de dados PostgreSQL, execute:

bash
Copiar
Editar
docker-compose up -d
Isso irá subir um container usando a imagem bitnami/postgresql, com as configurações de usuário e banco definidas no serviço pg.

✅ Configurações utilizadas:
Variável	Valor
POSTGRES_USER	docker
POSTGRES_PASSWORD	docker
POSTGRES_DB	upload
Porta	5432
📂 Scripts de inicialização:
O Docker irá executar automaticamente os arquivos presentes na pasta local ./docker, montada no container em:

bash
Copiar
Editar
/docker-entrypoint-initdb.d
Você pode colocar arquivos .sql ou .sh nesse diretório para pré-configurar seu banco (criação de tabelas, seeds, etc).