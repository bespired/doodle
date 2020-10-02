
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
> laravel v6.18.40  
> vuejs 2.6
> babel 7
  
so no https.  

__git clone__  

`git clone git@github.com:bespired/doodle.git doodle`  

__install laravel__  
`cd doodle`  

`cp laravel/.env.example laravel/.env`  

__install vuecli__
If you want to change the backend  
`cd vuecli`  
`npm install`  
`cd ..`  

__install draggr__   
If you want to change the frontend js  
`cd draggrjs`  
`npm install`  
`cd ..` 

On mac make sure de doodle folder is in the shared files.  
![file-share]  

Build the server  
`docker-compose build`  
(only needed the first time you start the server)  
  
Start the php server for laravel install  
`docker-compose up doodle_php`  

Use php version 7.2 in container to install Laravel 6  
`docker/doexec doodle_php composer install`  
`docker/doexec doodle_php php artisan key:generate`  
`docker/doexec doodle_php php artisan jwt:secret`  

`docker-compose stop`


Start the full system 
`docker-compose up -d`  
  
`docker/ps `
```
CONTAINER           NAMES               IMAGE       
e428d8bd5xxx:       traefik             traefik:v2.2          
6b65d00a7xxx:       doodle_api          nginx:alpine          
f07a2c093xxx:       doodle_php          draggr_doodle_php     
434a009eexxx:       doodle_vuejs        draggr_doodle_vuejs   
13d08027exxx:       doodle_mysql        mysql:8               
64dfa0c56xxx:       doodle_redis        redis:alpine          
```


__view__
Traefik:  
http://localhost:9090/dashboard/#/  

Laravel welcome:  
http://localhost/_  

Create default admin login  
`docker/doexec doodle_php php artisan doodle:create:admin`  

Doodle design:  
http://localhost/admin/doodledesign/welcome  

__develop doodle__  
Develop doodle with:  
`cd doodle/vuecli`  
`npm run serve`  
http://localhost:8020/admin  
 
__develop draggrjs__  
`cd doodle/draggrjs`  
`npm run watch`  
Compiles frontend to the public folder of laravel  

__artisan commands__  
docker/doexec doodle_php php artisan *command*

__Doodle welcome:__  
http://localhost/admin  
  
frontend welcome:  
http://localhost/page  


