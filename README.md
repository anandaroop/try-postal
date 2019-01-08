# Try Postal

[libpostal](https://github.com/openvenues/libpostal) as a webservice, with a front-end realtime demo.

![demo](https://cl.ly/1d47aaf5e055/%255Be26520a6b9df4e900def758045512f5d%255D_demo.gif)

## Build and run locally with docker

```sh
$ git clone https://github.com/anandaroop/try-postal.git
$ cd try-postal
$ docker build -t try-postal .
$ docker container run -it -p 5000:5000 try-postal
```

## Deploy with docker-machine

First, generate an access token for your provider, [e.g. Digital Ocean](https://docs.docker.com/machine/examples/ocean/).

```sh
# provision a decent sized server
$ docker-machine create --driver digitalocean --digitalocean-size s-2vcpu-4gb --digitalocean-access-token XXXXX try-postal

# connect to it
$ docker-machine env try-postal
$ eval $(docker-machine env try-postal)

# build and run
$ docker build -t try-postal .
$ docker container run -d -p 80:5000 try-postal

# ...may take a few seconds to load the ML models...

# visit in your browser
$ docker-machine ip try-postal
$ open http://<ip address here>
```
