#!/usr/bin/env bash

# Instalar novas dependências, se houver
pnpm install

# Desinstalar o módulo bcrypt para remover a versão compilada para macOS
pnpm remove bcrypt

# Instalar o módulo bcrypt novamente, compilando para o ambiente atual (Linux)
pnpm add bcrypt

echo "Starting API server"

pnpm start
