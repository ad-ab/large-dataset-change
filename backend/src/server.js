const fastify = require("fastify")({ logger: true });
const fastifyws = require("@fastify/websocket");

const setupWsRoutes = require("./fastify/ws");
const setupHttpRoutes = require("./fastify/http");

const mq = require("mqemitter");
const emitter = mq({ concurrency: 5 });

module.exports = setupFastify;

async function setupFastify(config) {
  let messageListener;

  // get stuff we need into the fastify object
  await fastify.register(fastifyws);
  fastify.decorate("emitter", emitter);
  fastify.decorate("config", config);
  fastify.decorate("listener", messageListener);

  // register http endpoints
  setupHttpRoutes(fastify);

  // register ws endpoints
  setupWsRoutes(fastify);

  // start the server
  try {
    await fastify.listen({ port: config.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
