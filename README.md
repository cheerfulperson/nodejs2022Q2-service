# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - Install docker and docker-compose using the instruction https://docs.docker.com/get-docker/
## Downloading

```
git clone https://github.com/cheerfulperson/nodejs2022Q2-service.git
git checkout -q docker
```
# Run Docker
## Run command:

```
docker-compose -p node-app up -d
```

## Scan docker image 

```
npm run scan:image

or

docker scan node-app_rest
```