# Build del frontend
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Servir con Nginx
FROM nginx:alpine
# Copiamos el build de Vite al directorio que sirve Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración opcional de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
