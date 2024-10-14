# Usar uma imagem base oficial do Node.js (v18-alpine ou v20-alpine)
FROM node:18-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Instalar o pnpm globalmente
RUN npm install -g pnpm

# Instalar dependências de build necessárias para compilar módulos nativos e o bash
RUN apk add --no-cache python3 make g++ bash

# Copiar apenas o package.json e pnpm-lock.yaml para otimizar o cache do Docker
COPY package*.json pnpm-lock.yaml ./

# Instalar as dependências do projeto usando pnpm (compilando módulos nativos)
RUN pnpm install

# Copiar o script de inicialização para o contêiner
COPY start.sh ./

# Tornar o script de inicialização executável
RUN chmod +x start.sh

# Copiar todo o código do projeto, exceto o que está no .dockerignore
COPY . .

# Compilar o projeto TypeScript
RUN pnpm build

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação usando o script de inicialização
CMD ["./start.sh"]
