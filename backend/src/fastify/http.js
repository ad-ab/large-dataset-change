module.exports = (fastify) => {
  fastify.get("/", (request, reply) => {
    return { hello: "world" };
  });

  // Message like this
  // POST http://127.0.0.1:3001/test-message // { "room": "room1", "participant": "AAA", "text": "Hi all" }
  // will be sent to all people connected to room1
  fastify.post("/test-message", (request, reply) => {
    reply.type("application/json").code(200);

    emitter.emit({
      topic: "room-event",
      meta: "send-message",
      room: request.body.room,
      broadCast: true,
      payload: {
        participant: request.body.participant,
        text: request.body.text,
        timestamp: new Date(),
      },
    });

    return { success: true };
  });
};
