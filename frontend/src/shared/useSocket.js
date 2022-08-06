import { SocketContext } from "./SocketProvider";
import { useContext } from "react";

export const useSocket = () => {
  const { data, connect } = useContext(SocketContext);

  return { data, connect };
};
