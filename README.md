# Nest.js authentication template

## Overview

Nest.js authentication template is a project created for personal use as a quickstarter for nest.js applications.
The main idea behind the project is to "quickify" the process of craeting a new nest.js API.
The template implements such things:
- PostgreSQL integration
- Authentication using JWT and passport library
- Basic permission-based authorization
- Config module and service ready to use
- `helmet` library and cors with deafult settings
- `prettier` configuration
- `Dockerfile` and `docker-compose.yml` for quick docker deployment

## Package manager and build

The project was created using `pnpm`, though you may use different package manager if you wish so.

The scripts are the same with the default Nest.js template. The common ones are:
- `build` - build the application
- `start` - build & start the application without auto-reload
- `start:dev` - build & start the application with auto-reload
- `format` - format the application files with `prettier`

## Environment variables configuration

By default these environment variables are necessary for the project to work (or it will throw an error):

- `PORT` (default - 3000) - the port the application will work on
- `HASH_SALT_ROUNDS` (default - 10) - the count of rounds used when salting passwords of users 
- `PG_HOST` - the host of the postgres database
- `PG_PORT` (default - 5432) - the port of the postgres database
- `PG_USERNAME` - username of postgres user
- `PG_PASSWORD` - password of postgres user
- `PG_DB` - postgres database
- `JWT_SECRET_KEY` - a JWT encryption key

## Docker

The `Dockerfile` and `docker-compose.yml` files are included in the repository.

`docker-compose.yml` starts the project alongside the postgres database, so be aware of not using it during development.

Building and using a container is not different from any other project. The simplest use scenario:

```
docker build . -t nestjs-authentication-template
docker run -it -p 3000:3000 nestjs-authentication-template
```

Or using `docker-compose` for deployment:

```
docker-compose up
```
