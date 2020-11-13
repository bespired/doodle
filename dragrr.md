
## Dragrr

Dragrr CMS

> Works with:
> Doodle

__bash into laravel__
`docker/doexec doodle_php bash`

__migrate laravel__
`php artisan migrate`

__create admin__
`copy .env.example .env`

change .env file to hold your credintials
```php
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@doodle.com
ADMIN_PASSWORD=yourpassword
```

`php artisan doodle:create:admin`

__create dragrr demo__
`php artisan doodle:config:settings`
`php artisan dragrr:config:settings`
`php artisan dragrr:config:demo`
`php artisan dragrr:compose:page --page=josette-gevers`

__create frontend scss__
`cd /Projects/draggr/compile`
`npm run sass`
(ctrl-c to stop watching)

http://localhost/josette-gevers

