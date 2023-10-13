FROM node:18-alpine

WORKDIR /frontend

COPY package.json . 
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]