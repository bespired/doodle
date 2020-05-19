
[docker-logo]: https://raw.githubusercontent.com/bespired/doodle/master/docker/logos/docker.png
[laravel-logo]: https://raw.githubusercontent.com/bespired/doodle/master/docker/logos/laravel.png
[node-logo]: https://raw.githubusercontent.com/bespired/doodle/master/docker/logos/node.png
[traefik-logo]: https://raw.githubusercontent.com/bespired/doodle/master/docker/logos/traefik.png
[vuejs-logo]: https://raw.githubusercontent.com/bespired/doodle/master/docker/logos/vue.png
[file-share]: https://raw.githubusercontent.com/bespired/doodle/master/docker/logos/file-share.png

![docker-logo] ![traefik-logo] ![laravel-logo] ![vuejs-logo] ![node-logo]

## Doodle  

Docker boilerplate with traefik 2, laravel 6, vue-cli and doodle-design

> Works with:  
> node 11.10.1  
> npm 6.14.5  

> Results in:  
> traefik 2.2.1  
> php 7.2  
> mysql 8  
> laravel 6.2  
> vuejs 2.6  

so no https.

__git clone__

`git clone git@github.com:bespired/doodle.git doodle`

__install__
`cd doodle`

`cp laravel/.env.example laravel/.env`

`cd vuecli;npm install;cd ..`

On mac make sure de doodle folder is in the shared files.
![file-share]

`docker-compose build`
`docker-compose up -d`

`docker ps`
```
IMAGE                 PORTS                                        NAMES
nginx:alpine          80/tcp, 443/tcp, 9000/tcp                    doodle_api
doodle_doodle_php     9000/tcp                                     doodle_php
doodle_doodle_vuejs   80/tcp, 443/tcp                              doodle_vuejs
redis:alpine          6379/tcp                                     doodle_redis
mysql:5.7             33060/tcp, 0.0.0.0:3319->3306/tcp            doodle_mysql
traefik:v2.2          0.0.0.0:80->80/tcp, 0.0.0.0:9090->8080/tcp   traefik
```


Use php version 7.2 in container to install Laravel 6
`docker/doexec.sh doodle_php composer install`
`docker/doexec.sh doodle_php php artisan key:generate`  
`docker/doexec.sh doodle_php php artisan jwt:secret`  



__view__  
Traefik:
http://localhost:9090/dashboard/#/

Laravel welcome:
http://localhost/_

Doodle welcome:
http://localhost/admin


__develop__  
Develop doodle with:  
`cd doodle/vuecli`  
`npm run serve`  
http://localhost:8020/admin  


