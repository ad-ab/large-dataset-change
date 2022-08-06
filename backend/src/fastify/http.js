const { HEADER_DEFINITION } = require("../constants");

module.exports = (fastify) => {
  fastify.get("/", get);
  fastify.get("/all", getAll);
  fastify.get("/diff", getDiff);

  fastify.post("/test-message", postTestMessage);
  fastify.post("/delete/:id", deleteById);

  function get(request, reply) {
    return { hello: "world" };
  }

  function getAll(request, reply) {
    const { simulation } = fastify;

    const { data, counter } = simulation.get();

    reply.type("application/json").code(200);
    return { data, counter };
  }

  function getDiff(request, reply) {
    const { simulation } = fastify;

    const { difference, counter } = simulation.get();

    reply.type("application/json").code(200);
    return { difference, counter };
  }

  function deleteById(request, reply) {
    const { id } = request.params;

    // validate ... no time
    const { simulation } = fastify;
    simulation.remove(id);

    reply.code(200);
    return null;
  }

  function postTestMessage(request, reply) {
    // Message like this
    // POST http://127.0.0.1:3001/test-message // { "room": "room1", "participant": "AAA", "text": "Hi all" }
    // will be sent to all people connected to room1
    reply.type("application/json").code(200);

    const { emitter } = fastify;

    emitter.emit({
      topic: "room-event",
      meta: "send-message",
      room: "room1",
      broadCast: true,
      payload: {
        participant: request.body.participant,
        text: request.body.text,
        timestamp: new Date(),
      },
    });

    return { success: true };
  }
};
