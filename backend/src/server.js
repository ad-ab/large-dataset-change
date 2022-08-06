const fastify = require("fastify")({ logger: true });
const fastifyws = require("@fastify/websocket");
const fastifycompress = require("@fastify/compress");
const fastifycors = require("@fastify/cors");

const setupWsRoutes = require("./fastify/ws");
const setupHttpRoutes = require("./fastify/http");

const DataSimulator = require("./datasimulator");
const mq = require("mqemitter");
const emitter = mq({ concurrency: 5 });

module.exports = setupFastify;

async function setupFastify(config) {
  // get stuff we need into the fastify object
  await fastify.register(fastifycors, { origin: "*" });
  await fastify.register(fastifyws);
  await fastify.register(fastifycompress, {
    global: true,
    threshold: 2048,
  });

  const simulator = new DataSimulator(config);
  fastify.decorate("emitter", emitter);
  fastify.decorate("config", config);
  fastify.decorate("simulation", simulator);
  simulator.setTickEvent((e) => {
    emitter.emit({
      topic: "room-event",
      meta: "send-message",
      room: "room1",
      broadCast: true,
      payload: {
        counter: e.counter,
        checksum: e.checksum,
        difference: e.difference,
      },
    });
  });

  // register http endpoints
  setupHttpRoutes(fastify);

  // register ws endpoints
  setupWsRoutes(fastify);

  // start the server
  try {
    await fastify.listen({ port: config.PORT });
    fastify.simulation.start();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
