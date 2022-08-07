# Frontend

Frontend for the large-dataset-change project. Created in react.

## Installation

Requires `node.js`. Then the frontend folder run:

```sh
npm i 
```

## Running

```sh
npm run start
```

## Env Variables

|Variable|ExampleValue|Description| 
|--------|------------|-----------|
|REACT_APP_WS_URL|ws://127.0.0.1:3001/event|Websocket endpoint|
|REACT_APP_HTTP_URL|http://127.0.0.1:3001|REST API endpoint|

## Docker

This will build a nginx docker image with the built version of the frontend. The ENV variables get locked during build time. To change them when the docker image spins up we would need to use a script and a slightly different approach but it is possible.

```sh
docker build . -t frontend:latest
```