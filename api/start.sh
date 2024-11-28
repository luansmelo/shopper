#!/bin/bash

echo "Esperando o banco de dados iniciar..."
until nc -z -v -w30 $DB_HOST 5432; do
    echo "Aguardando banco de dados..."
    sleep 1
done

echo "Banco de dados está online! Rodando as seeds..."
npm run db:seed

echo "Iniciando o servidor..."
npm start
