#!/bin/bash

RED='\033[0;31m'

read_env() {
    local filePath="${1:-"$PWD/docker/envs/.env.development"}"

    if [ ! -f "$filePath" ]; then
        echo "Missing \"${filePath}\" file"

        exit 1
    fi

    echo "Reading \"$filePath\""

    while read -r LINE; do
        # Remove leading and trailing whitespaces, and carriage return
        CLEANED_LINE=$(echo "$LINE" | awk '{$1=$1};1' | tr -d '\r')

        if [[ $CLEANED_LINE != '#'* ]] && [[ $CLEANED_LINE == *'='* ]]; then
            export "$CLEANED_LINE"
        fi
    done <"$filePath"
}

read_env

pnpm build:nested

docker-compose -f ./docker/docker-compose.dev.yaml up -d

if [ $? = 1 ]; then
    echo -e "\n${RED}Failed to start Docker services"

    exit 1
fi

if [ ! -d "./node_modules" ]; then
    echo -e "${RED}Must run 'pnpm i'"

    exit 1
fi

cd ./terraform
tflocal init
tflocal apply -auto-approve

if [ $? = 1 ]; then
    echo -e "\n${RED}Failed to start TFLocal"

    exit 1
fi

cd ..
pnpm -r start:dev
