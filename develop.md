
## Dragrr

1.
In docker set file sharing to the dragrr folder


<br>
### start server
Open a terminal

```
> cd dragrr 
> docker/startnetworks
> docker-compose up
```

This can take a while to build all.


If this not the first time something like this might show up:

> ERROR: for traefik Cannot create container for service traefik: Conflict. 
> The container name "/traefik" is already in use by container "2fe0bc5bCreating doodle_vuejs ... error

```
> docker/removeall
```
<br><br>
### start compile and watch of es6 and sass
Open a terminal

```
> cd dragrr
> cd compile
> npm run back-sass&; npm run back-watch
```
Stop it with

```
> ctrl-c
> fg
> ctrl-c
```
<br><br>
### start vue serve
Open a terminal

```
> cd dragrr
> cd vuecli
> npm run serve
```
<br><br>
### start vue serve
Open a terminal

```
> cd dragrr
> docker/ps
```
```
> cd dragrr
> docker/ps
```