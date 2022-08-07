# Backend

Backend for the large-dataset-change project. Created using fastify.

## Installation

Requires `node.js`. Then the frontend folder run:

```sh
npm i 
```

## Running

You can start the server by running

```sh
npm run start
```

## Env Variables

|Variable|ExampleValue|Description| 
|--------|------------|-----------|
|APP_RANDOM_SEED|RANDOM|Random seed key|
|APP_SIZE|5000|How many sample lines will we use|
|APP_PORT|3001|Port the APIs will run on|

## Docker

This will create a node-alpine docker that will run the webserver on the specified port.

```sh
docker build . -t backend:latest
```