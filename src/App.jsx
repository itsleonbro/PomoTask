import { useState } from "react";
import styles from "./App.module.css";
import Home from "./pages/Home";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
