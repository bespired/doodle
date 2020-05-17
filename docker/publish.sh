#!/bin/bash
docker-compose build doodle_vuejs
docker-compose up -d --force-recreate doodle_vuejs
