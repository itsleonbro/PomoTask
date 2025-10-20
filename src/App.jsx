import { useState } from "react";
import styles from "./App.module.css";
import Home from "./pages/Home";

import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
      <Analytics />
    </>
  );
};

export default App;
