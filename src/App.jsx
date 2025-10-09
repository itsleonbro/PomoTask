import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />

      <div>
        <p className="container">Hello world</p>
      </div>

      <div>
        <p className={style.container}>Hello world</p>
      </div>
    </>
  );
};

export default App;
