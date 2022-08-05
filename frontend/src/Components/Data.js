import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../shared/useSocket";

const Component = () => {
  const { socket, connect } = useSocket();
  const [data, setData] = useState([]);

  const onMessage = useCallback((message) => {
    const msg = JSON.parse(message?.data);
    // apply message onto the data...
    // check checksum
    // if not working request a full download and go from there
    // remember a few change sets to apply
    data.unshift(msg);
    setData([...data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    connect();

    socket.addEventListener("message", onMessage);

    return () => socket.removeEventListener("message", onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, connect]);

  return (
    <>
      <div>WS Connected</div>
      <div>
        {data
          .filter((v, i) => i < 20 && v.payload)
          .map((p) => p.payload)
          .map((d, i) => (
            <div key={d.counter}>
              {JSON.stringify({
                count: d.counter,
                checksum: d.checksum,
              })}
            </div>
          ))}
      </div>
    </>
  );
};

export default Component;
