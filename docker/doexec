#!/bin/bash
NAME="$1"
COMMAND="${@:2}"
CONTAINER="$(docker ps -f name=${NAME} --format={{.ID}})"
docker exec -ti "${CONTAINER}" ${COMMAND}