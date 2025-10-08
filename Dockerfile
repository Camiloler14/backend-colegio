# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (dev + prod)
RUN npm install

# Copiar el resto del código
COPY . .

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app ./

# Instalar solo dependencias de producción
RUN npm install --production

# Exponer puerto
EXPOSE 3000

# Variables de entorno se pasan al correr el contenedor
# CMD para iniciar la API
CMD ["npm", "start"]
