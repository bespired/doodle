#!/usr/bin/env bash

# Copying environment to the .env file
if [ "$APP_ENV" = "production" ] || [ "$APP_ENV" = "staging" ] ; then
    env|sed 's/^\(.*\)=\(.*\)$/\1="\2"/g' > /application/laravel/.env
fi

# Set folder permissions
chown -R www-data:www-data /application/storage /application/bootstrap/cache
chgrp -R www-data /application/storage /application/bootstrap/cache

# Enforce permissions and inherit parent folder permissions
chmod g+s /application/storage /application/bootstrap/cache
chmod -R ug+rwx /application/storage /application/bootstrap/cache

# This should not be needed and is very dangerous
chmod 777 -R /application/storage/logs
chmod 777 -R /application/storage/framework

su -c "php artisan cache:clear" -s /bin/sh www-data
su -c "php artisan config:clear" -s /bin/sh www-data


su -c "php artisan doodle:migrate" -s /bin/sh www-data

/usr/bin/supervisord -n -c /etc/supervisord.conf