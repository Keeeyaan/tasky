FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# WORKDIR /app/src

COPY ./src/prisma ./prisma

RUN npx prisma generate

# WORKDIR /app

COPY . .

EXPOSE 8000

CMD npm run dev 