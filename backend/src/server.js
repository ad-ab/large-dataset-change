const fastify = require("fastify")({ logger: true });
const fastifyws = require("@fastify/websocket");

const mq = require("mqemitter");
const emitter = mq({ concurrency: 5 });

let messageListener;

fastify.register(fastifyws);

fastify.get("/", async (request, reply) => {
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

// Connecting to room
// ws://127.0.0.1:3001/room-ws { "meta":"join", "room": "room1", "participant": "you", "payload": "Hi" }
fastify.register(async function (fastify) {
  fastify.get(
    "/room-ws",
    { websocket: true },
    (connection /* SocketStream */, req /* FastifyRequest */) => {
      // connection.socket.on("message", (message) => {
      //   // message.toString() === 'hi from client'
      //   connection.socket.send("hi from server");
      // });

      connection.socket.on("message", (message) => {
        const { meta, room, participant, payload } = JSON.parse(message);
        console.log("received message", { meta, room, participant, payload });

        switch (meta) {
          case "join":
            // Activate a new message listener
            messageListener = (event, done) => {
              if (
                event.room == room &&
                (event.broadCast || event.participant == participant)
              ) {
                connection.socket.send(
                  JSON.stringify({ meta: event.meta, payload: event.payload })
                );
              }

              done();
            };

            emitter.on("room-event", messageListener);

            connection.socket.send(
              JSON.stringify({
                meta: "room-joined",
                room,
                participant,
              })
            );
            break;

          case "send-message":
            // Use the emitter to broadcast the message to the room participants
            emitter.emit({
              topic: "room-event",
              meta: "send-message",
              room,
              broadCast: true,
              payload,
            });
            break;

          default:
            break;
        }
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
