# Imagen base oficial de Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto que usa tu app (3000)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
