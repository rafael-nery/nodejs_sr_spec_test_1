# NODEJS SR SPEC TEST - PARTE 2: Prática

NestJS CRUD API com Docker, Swagger, Winston e Sentry

Este projeto faz parte de um teste prático para a vaga de Especialista em NodeJS, demonstrando habilidades avançadas em desenvolvimento backend. A API inclui autenticação JWT, validação de dados, tratamento de erros, documentação com Swagger, logs avançados com Winston e monitoramento de erros com Sentry. Além disso, a aplicação está dockerizada para facilitar a implantação e utiliza pnpm para gerenciamento eficiente de pacotes.

## 📄 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
    - [1. Clonando o Repositório](#1-clonando-o-repositório)
    - [2. Instalando o pnpm](#2-instalando-o-pnpm)
    - [3. Instalando as Dependências](#3-instalando-as-dependências)
    - [4. Configurando Variáveis de Ambiente](#4-configurando-variáveis-de-ambiente)
- [Rodando a Aplicação](#rodando-a-aplicação)
    - [Usando Docker Compose](#usando-docker-compose)
    - [Sem Docker](#sem-docker)
- [Testando a API](#testando-a-api)
    - [Documentação com Swagger](#documentação-com-swagger)
    - [Logs com Winston](#logs-com-winston)
    - [Monitoramento com Sentry](#monitoramento-com-sentry)
- [Execução de Testes](#execução-de-testes)
- [Dockerização](#dockerização)
    - [Dockerfile](#dockerfile)
    - [docker-compose.yml](#docker-composeyml)
- [Considerações Finais](#considerações-finais)
- [Contato](#contato)

## Visão Geral

Esta aplicação fornece uma API RESTful para gerenciamento de usuários, permitindo criar, ler, atualizar e deletar registros. Além disso, implementa autenticação segura com JWT, validação de dados robusta, logs detalhados para monitoramento e integração com ferramentas de monitoramento de erros.

## Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/):** Framework Node.js para construção de aplicações escaláveis e eficientes.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript que adiciona tipagem estática.
- **[MongoDB](https://www.mongodb.com/):** Banco de dados NoSQL utilizado para armazenamento de dados.
- **[Mongoose](https://mongoosejs.com/):** ODM para MongoDB, facilitando a modelagem de dados.
- **[JWT (JSON Web Tokens)](https://jwt.io/):** Para autenticação e autorização.
- **[Swagger](https://swagger.io/):** Para documentação interativa da API.
- **[Winston](https://github.com/winstonjs/winston):** Biblioteca de logging.
- **[Sentry](https://sentry.io/):** Ferramenta de monitoramento e rastreamento de erros.
- **[Docker](https://www.docker.com/):** Plataforma para containerização da aplicação.
- **[PM2](https://pm2.keymetrics.io/):** Gerenciador de processos para Node.js.
- **[pnpm](https://pnpm.io/):** Gerenciador de pacotes rápido e eficiente.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- **[Node.js](https://nodejs.org/en/download/):** Versão 14 ou superior.
- **[pnpm](https://pnpm.io/installation):** Gerenciador de pacotes.
- **[Docker](https://www.docker.com/get-started):** Para rodar a aplicação em containers.
- **[Docker Compose](https://docs.docker.com/compose/install/):** Para orquestrar múltiplos containers.
- **[MongoDB](https://www.mongodb.com/try/download/community):** Se optar por rodar sem Docker.

## Instalação

### 1. Clonando o Repositório

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/rafael-nery/nodejs_sr_spec_test_1
cd nodejs_sr_spec_test_1/parte2
```

### 2. Instalando o pnpm

Se você ainda não possui o `pnpm` instalado, instale-o globalmente usando `npm`:

```bash
npm install -g pnpm
```

### 3. Instalando as Dependências

Instale todas as dependências do projeto utilizando `pnpm`:

```bash
pnpm install
```

### 4. Configurando Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```dotenv
# .env
JWT_SECRET=seuSegredoAqui
MONGODB_URI=mongodb://mongo:27017/nest-api
SENTRY_DSN=https://<PublicKey>@sentry.io/<ProjectID>
```

**Descrição das Variáveis:**

- `JWT_SECRET`: Chave secreta para assinatura dos tokens JWT.
- `MONGODB_URI`: URI de conexão com o MongoDB. Se estiver usando Docker Compose, utilize `mongodb://mongo:27017/nest-api`.
- `SENTRY_DSN`: DSN fornecido pelo Sentry para integração.

## Rodando a Aplicação

### Usando Docker Compose

A maneira mais fácil de rodar a aplicação junto com o MongoDB é utilizando o Docker Compose.

1. **Certifique-se de que o Docker e o Docker Compose estão instalados.**

2. **Inicie os serviços com o Docker Compose:**

   ```bash
   pnpm docker:up
   ```

   **Nota:** Certifique-se de ter adicionado um script no `package.json` para facilitar o uso do Docker Compose. Caso não tenha, você pode usar diretamente:

   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação:**

    - **API:** `http://localhost:3000`
    - **Swagger:** `http://localhost:3000/api-docs`

### Sem Docker

Se preferir rodar a aplicação localmente sem Docker, siga os passos abaixo:

1. **Instale as dependências:**

   ```bash
   pnpm install
   ```

2. **Inicie o MongoDB:**

    - **Localmente:** Certifique-se de que o MongoDB está rodando na URI especificada (`mongodb://localhost:27017/nest-api`).
    - **Remotamente:** Atualize a variável `MONGODB_URI` no `.env` com a URI do seu servidor MongoDB.

3. **Compile o projeto:**

   ```bash
   pnpm build
   ```

4. **Inicie a aplicação:**

   ```bash
   pnpm start:prod
   ```

   A aplicação estará disponível em `http://localhost:3000`.

## Testando a API

### Documentação com Swagger

A documentação interativa da API está disponível através do Swagger.

1. **Acesse a documentação:**

   Navegue até [http://localhost:3000/api-docs](http://localhost:3000/api-docs) no seu navegador.

2. **Explorar Endpoints:**

    - **Registro de Usuário:**
        - **Endpoint:** `POST /users/register`
        - **Descrição:** Registra um novo usuário.
        - **Body:**
          ```json
          {
            "username": "seuUsuario",
            "password": "suaSenha"
          }
          ```
        - **Teste:** Clique em "Try it out", preencha os campos e execute a requisição.

    - **Login:**
        - **Endpoint:** `POST /login`
        - **Descrição:** Autentica um usuário e retorna um token JWT.
        - **Body:**
          ```json
          {
            "username": "seuUsuario",
            "password": "suaSenha"
          }
          ```
        - **Teste:** Execute a requisição para obter o token JWT.

    - **Endpoints Protegidos (Ex.: Listar Usuários):**
        - **Endpoint:** `GET /users`
        - **Autenticação:** Clique em "Authorize" no Swagger e insira `Bearer <seuTokenJWT>`.
        - **Descrição:** Lista todos os usuários.
        - **Teste:** Execute a requisição com o token autorizado.

### Logs com Winston

O Winston está configurado para registrar logs detalhados tanto no console quanto em arquivos.

1. **Verifique os Logs no Console:**

   Ao realizar ações na API (como criar ou listar usuários), observe o terminal onde a aplicação está rodando para ver os logs emitidos.

   **Exemplo de Log:**
   ```
   [2024-04-27T10:00:00.000Z] POST /users/register 201 - 150ms
   Criando um novo usuário
   ```

2. **Verifique os Arquivos de Log:**

   Os logs são armazenados na pasta `logs/`.

    - **Logs Completos:** `logs/combined.log`
    - **Logs de Erro:** `logs/error.log`

   **Exemplo:**

   ```bash
   cat logs/combined.log
   ```

   ```
   {"level":"info","message":"Criando um novo usuário","timestamp":"2024-04-27T10:00:00.000Z"}
   ```

### Monitoramento com Sentry

O Sentry captura e monitora erros na aplicação.

1. **Verifique a Configuração do Sentry:**

   Certifique-se de que a variável `SENTRY_DSN` está corretamente configurada no arquivo `.env`.

2. **Gerar um Erro de Teste:**

   Para verificar se o Sentry está capturando erros, acesse o endpoint de teste criado:

   ```
   http://localhost:3000/test/error
   ```

   Isso irá gerar um erro intencionalmente.

3. **Verifique no Sentry:**

   Acesse sua conta no Sentry e confirme se o erro foi registrado.

## Execução de Testes

Esta aplicação inclui testes unitários utilizando **Jest**.

1. **Execute os testes:**

   ```bash
   pnpm test
   ```

2. **Resultados dos Testes:**

   O Jest executará os testes e exibirá os resultados no terminal.

   **Exemplo:**

   ```
    PASS  test/user.controller.spec.ts
     UserController
       ✓ deve criar um usuário (50 ms)
       ✓ deve listar todos os usuários (30 ms)
   ```

## Dockerização

A aplicação está configurada para rodar em containers Docker, facilitando a implantação e a consistência entre ambientes.

### Dockerfile

O `Dockerfile` define a imagem Docker para a aplicação.

```dockerfile
# Dockerfile
FROM node:16-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar o pnpm-lock.yaml e package.json
COPY package.json pnpm-lock.yaml ./

# Instalar o pnpm globalmente
RUN npm install -g pnpm

# Instalar as dependências do projeto
RUN pnpm install --frozen-lockfile

# Copiar todo o código do projeto
COPY . .

# Compilar o projeto TypeScript
RUN pnpm build

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["pnpm", "start:prod"]
```

### docker-compose.yml

O `docker-compose.yml` orquestra os serviços da aplicação e do MongoDB.

```yaml
# docker-compose.yml
version: '3'
services:
  api:
    build: .
    ports:
      - '3000:3000'
    depends_on:
      - mongo
    environment:
      - MONGODB_URI=mongodb://mongo:27017/nest-api
      - JWT_SECRET=seuSegredoAqui
      - SENTRY_DSN=https://<PublicKey>@sentry.io/<ProjectID>
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
      - ./logs:/usr/src/app/logs
  mongo:
    image: mongo:4.4
    volumes:
      - ./data/db:/data/db
    ports:
      - '27017:27017'
```

**Descrição dos Serviços:**

- **api:**
    - **Build:** Constrói a imagem Docker usando o `Dockerfile`.
    - **Ports:** Mapeia a porta `3000` do container para a porta `3000` do host.
    - **Depends_on:** Garante que o serviço `mongo` esteja rodando antes da API.
    - **Environment:** Define variáveis de ambiente necessárias.
    - **Volumes:**
        - Mapeia o diretório atual para `/usr/src/app` dentro do container.
        - Mapeia a pasta `logs` para persistir os logs.

- **mongo:**
    - **Image:** Utiliza a imagem oficial do MongoDB.
    - **Volumes:** Persiste os dados do MongoDB na pasta `data/db`.
    - **Ports:** Mapeia a porta `27017` do container para a porta `27017` do host.

### Executando com Docker Compose

1. **Certifique-se de que o Docker e o Docker Compose estão instalados.**

2. **Inicie os serviços:**

   ```bash
   pnpm docker:up
   ```

   **Nota:** Se você não adicionou um script para isso, use diretamente:

   ```bash
   docker-compose up --build
   ```

   Este comando irá:

    - Construir a imagem Docker para a API.
    - Iniciar os containers da API e do MongoDB.
    - Mapear as portas conforme configurado.

3. **Acesse a aplicação:**

    - **API:** `http://localhost:3000`
    - **Swagger:** `http://localhost:3000/api-docs`

4. **Parar os serviços:**

   Para parar os containers, pressione `Ctrl + C` no terminal onde o Docker Compose está rodando ou execute:

   ```bash
   docker-compose down
   ```

## Contato

Para dúvidas, sugestões ou contribuições, sinta-se à vontade para abrir uma issue ou enviar um pull request no repositório.