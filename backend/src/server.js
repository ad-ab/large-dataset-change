const fastify = require("fastify")({ logger: true });
const fastifyws = require("@fastify/websocket");

fastify.register(fastifyws);

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.register(async function (fastify) {
  fastify.get(
    "/hello-ws",
    { websocket: true },
    (connection /* SocketStream */, req /* FastifyRequest */) => {
      connection.socket.on("message", (message) => {
        // message.toString() === 'hi from client'
        connection.socket.send("hi from server");
      });
    }
  );
});

module.exports.start = async (config) => {
  const { PORT } = config;

  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
