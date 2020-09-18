#!/bin/bash

cp laravel/.env.example laravel/.env
cd vuecli;npm install;cd ..
docker-compose build
docker-compose up -d
docker ps
docker/doexec.sh doodle_php composer install
docker/doexec.sh doodle_php php artisan key:generate
