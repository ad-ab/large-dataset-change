import { createContext, useEffect, useState } from "react";
import JSum from "jsum";
import axios from "axios";

const socket = new WebSocket(process.env.REACT_APP_WS_URL);

// cnosidering both are sorted by ID ascendingly
const addDiffToData = (oldData, diff) => {
  const { changes, deletions } = diff;
  const data = [...oldData.filter((x) => !deletions.includes(x.id))];
  if (!changes.length) return [data];

  let changesCounter = 0;
  let dataCounter = 0;
  while (changesCounter < changes.length && dataCounter < data.length) {
    const change = changes[changesCounter];
    const { id } = change;

    while (dataCounter < data.length && data[dataCounter].id < id) {
      dataCounter++;
    }

    if (dataCounter >= data.length) break;

    // at this point we either found the same ids or we need to add the item to the data array at this point
    if (data[dataCounter].id === id) {
      // update item
      data[dataCounter] = { ...data[dataCounter], ...change };
    } else {
      // insert into data into correct spot
      data.splice(dataCounter, 0, change);
    }

    changesCounter++;
  }

  // things left in changes that need to be added to data
  while (changesCounter < changes.length) {
    data.push(changes[changesCounter++]);
  }

  return data;
};

export const SocketContext = createContext({
  data: [],
  socket: null,
  connect: () => null,
});

export const SocketProvider = (props) => {
  const [data, setData] = useState([]);
  const [currentCounter, setCurrentCounter] = useState(0);
  const [diffHistory, setDiffHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Refetches the whole state if crc is bad, reapplies crc from history
  // keeps adding new changes
  useEffect(() => {
    const run = async () => {
      if (!diffHistory.length || isDownloading) return;
      if (currentCounter === diffHistory[0].counter) return; // updated all we needed

      const diff = diffHistory.find((x) => x.counter === currentCounter + 1);
      const { difference, checksum, counter } = diff || diffHistory[0];

      const newData = addDiffToData(data, difference);
      const crc = JSum.digest(newData, "MD5", "hex");
      if (checksum !== crc) {
        setIsDownloading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_HTTP_URL}/all`
        );
        setIsDownloading(false);
        setData(data.data);
        setCurrentCounter(data.counter);
      } else {
        setCurrentCounter(counter);
        setData(newData);
      }
    };

    run();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diffHistory, currentCounter]);

  const onMessage = (message) => {
    const msg = JSON.parse(message?.data);

    if (!msg || msg.meta !== "send-message" || !msg.payload) return;
    // add differences to array
    setDiffHistory((diffHistory) => {
      const newDiffHistory = [msg.payload, ...diffHistory];
      if (newDiffHistory.length > 50) newDiffHistory.pop();
      return newDiffHistory;
    });
  };

  const connect = () => {
    console.log("connecting ws...");
    socket.send(
      JSON.stringify({
        meta: "join",
        room: "room1",
        participant: "you",
        payload: "Hi",
      })
    );

    socket.addEventListener("message", onMessage);
  };

  return (
    <SocketContext.Provider value={{ data, connect }}>
      {props.children}
    </SocketContext.Provider>
  );
};
