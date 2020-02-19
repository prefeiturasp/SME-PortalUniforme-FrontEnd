#!/usr/bin/env bash

#https://docs.travis-ci.com/user/environment-variables/#convenience-variables
#https://docs.travis-ci.com/user/deployment/script/

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker push marcelomaia/portal_uniforme_frontend