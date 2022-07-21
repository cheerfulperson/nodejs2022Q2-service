FROM node:lts-alpine3.15

EXPOSE ${PORT}

WORKDIR /app

COPY package*.json tsconfig.json tsconfig.build.json ./
COPY doc ./doc

RUN npm install

COPY . .

CMD ["npm", "run", "start:prod"]