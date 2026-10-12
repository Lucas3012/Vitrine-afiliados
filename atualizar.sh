#!/bin/bash

echo "🚀 Iniciando atualização do repositório..."

# Adiciona todas as modificações
git add .

# Pede a mensagem do commit ao usuário
echo -n "Digite a mensagem para o commit: "
read mensagem

# Se o usuário não digitar nada, usa uma mensagem padrão
if [ -z "$mensagem" ]; then
    mensagem="Atualização automática da vitrine"
fi

# Faz o commit com a mensagem informada
git commit -m "$mensagem"

# Envia para o GitHub
git push

echo "✅ Pronto! Alterações enviadas com sucesso para o GitHub."
