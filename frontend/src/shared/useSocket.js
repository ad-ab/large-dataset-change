import { SocketContext } from "./SocketProvider";
import { useContext } from "react";

export const useSocket = () => {
  const { socket, connect } = useContext(SocketContext);

  return { socket, connect };
};
