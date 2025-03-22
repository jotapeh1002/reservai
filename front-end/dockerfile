FROM node:22-slim

WORKDIR /app

COPY package*.json ./

COPY . .

RUN yarn install

EXPOSE 5173

CMD ["yarn", "run", "dev", "--", "--host", "0.0.0.0"]
