import { useState } from "react";
import "./App.css";
import Data from "./Components/Data";

function App() {
  const [show, setShow] = useState(false);

  return (
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
  );
}

export default App;
