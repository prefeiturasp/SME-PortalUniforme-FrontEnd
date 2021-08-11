#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt
# Example:
# docker run  -p 8081:80 \
#  -e API_URL="http://localhost:8000" \
#  -e SERVER_NAME="localhost" 
#  prefeitura_sp/oferta-imoveis:latest

set -xe
  : "${API_URL?Precisa de uma variavel de ambiente API_URL}"

set -xe
  : "${SERVER_NAME?Precisa de uma variavel de ambiente SERVER_NAME}"

set -xe
  : "${SENTRY_URL?Precisa de uma variavel de ambiente SENTRY_URL}"

set -xe
  : "${REACT_APP_ATUALIZACAO_CADASTRAL_URL?Precisa de uma variavel de ambiente REACT_APP_ATUALIZACAO_CADASTRAL_URL}"

set -xe
  : "${REACT_APP_CONSULTA_CADASTRO_URL?Precisa de uma variavel de ambiente REACT_APP_CONSULTA_CADASTRO_URL}"

set -xe
  : "${CODE_GA?Precisa de uma variavel de ambiente CODE_GA}"


sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,ATUALIZACAO_CADASTRAL_URL_REPLACE_ME,$REACT_APP_ATUALIZACAO_CADASTRAL_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,CONSULTA_CADASTRO_URL_REPLACE_ME,$REACT_APP_CONSULTA_CADASTRO_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,GA_REPLACE_ME,$CODE_GA,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,SENTRY_URL_REPLACE_ME,$SENTRY_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,SERVER_NAME,$SERVER_NAME,g" /etc/nginx/conf.d/default.conf

exec "$@"