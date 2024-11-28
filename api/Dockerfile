FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20 AS production

WORKDIR /app

COPY --from=build /app /app

RUN echo "PORT=8080" >> /app/.env && \
    echo "NODE_ENV=development" >> /app/.env && \
    echo "GOOGLE_API_KEY=${GOOGLE_API_KEY}" >> /app/.env && \
    echo "DB_HOST=${DB_HOST}" >> /app/.env && \
    echo "DB_USER=${DB_USER}" >> /app/.env && \
    echo "DB_NAME=${DB_NAME}" >> /app/.env && \
    echo "DB_PASSWORD=${DB_PASSWORD}" >> /app/.env

RUN apt-get update && apt-get install -y netcat-openbsd

COPY start.sh /app/start.sh

RUN chmod +x /app/start.sh

EXPOSE 8080

CMD ["./start.sh"]
