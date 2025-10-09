import { useState } from "react";
import styles from "./App.module.css";
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
        <p className={styles.container}>Hello world</p>
      </div>
    </>
  );
};

export default App;
