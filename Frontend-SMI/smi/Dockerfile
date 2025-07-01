# Stage 1: Build the Angular application
FROM node:6 as node
WORKDIR /app

# Copier les fichiers de configuration de npm
COPY package*.json ./
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application Angular
RUN npm run build --prod

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=node /app/dist/smi /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
