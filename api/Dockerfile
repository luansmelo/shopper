FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20 AS production

WORKDIR /app

COPY --from=build /app /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY start.sh /app/start.sh

RUN chmod +x /app/start.sh

EXPOSE 8080

CMD ["./start.sh"]
