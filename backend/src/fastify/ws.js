module.exports = createRoutes;

function createRoutes(fastify) {
  const { emitter } = fastify;
  let messageListener;

  // Connecting to room
  // ws://127.0.0.1:3001/event { "meta":"join", "room": "room1", "participant": "you", "payload": "Hi" }
  fastify.get(
    "/event",
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
              room: "room1",
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
}
