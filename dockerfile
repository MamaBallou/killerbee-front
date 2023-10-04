# Étape 1: Étape de construction
FROM node:latest as builder

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm install

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Build the project
RUN npm run build

# Étape 2: Image finale
FROM nginx:latest

WORKDIR /usr/share/nginx/html

# Supprimez la page d'index par défaut de Nginx
RUN rm -rf ./*

# Copiez les fichiers de l'étape de construction (étape 1)
COPY --from=builder /app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Démarrez Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
