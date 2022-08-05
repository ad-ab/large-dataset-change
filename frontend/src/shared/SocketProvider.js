import { createContext } from "react";

const socket = new WebSocket(process.env.REACT_APP_WS_URL);
const connect = () => {
  socket.send(
    JSON.stringify({
      meta: "join",
      room: "room1",
      participant: "you",
      payload: "Hi",
    })
  );
};

export const SocketContext = createContext({ socket, connect });

export const SocketProvider = (props) => {
  return (
    <SocketContext.Provider value={{ socket: socket, connect }}>
      {props.children}
    </SocketContext.Provider>
  );
};
