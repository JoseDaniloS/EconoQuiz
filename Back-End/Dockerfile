FROM node:18-alpine

# Diretório da aplicação
WORKDIR /app

# Copiar somente arquivos de dependência
COPY package*.json ./

# Instalar dependências de produção
RUN npm ci --omit=dev

# Copiar restante do projeto
COPY . .

# Porta usada pelo servidor
EXPOSE 3000

# Comando de inicialização da aplicação
CMD ["node", "src/server.js"]
