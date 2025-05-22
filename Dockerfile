FROM node:18

WORKDIR /

# Copy only package.json to install deps first (to cache this layer)
COPY package*.json ./

RUN npm install

# Copy app code (excluding node_modules because of .dockerignore)
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
