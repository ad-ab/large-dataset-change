import { useState } from "react";
import "./App.css";
import Data from "./Components/Data";
import { SocketProvider } from "./shared/SocketProvider";

function App() {
  const [show, setShow] = useState(false);

  return (
    <SocketProvider>
      <div className="App">
        {!show && (
          <>
            <header className="App-header">
              Click button to connect to server
              <div>
                <button
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Click Me!
                </button>
              </div>
            </header>
          </>
        )}
        {show && <Data />}
      </div>
    </SocketProvider>
  );
}

export default App;
