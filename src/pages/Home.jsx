import styles from "./Home.module.css";
import Timer from "../components/Timer/Timer";
import Tasks from "../components/Tasks/Tasks";
import { useState, useEffect } from "react";

const Home = () => {
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div className={styles.container}>
        <Timer activeTaskId={activeTaskId} setActiveTaskId={setActiveTaskId} tasks={tasks} />
        <Tasks setActiveTaskId={setActiveTaskId} tasks={tasks} setTasks={setTasks} />
      </div>
    </>
  );
};

export default Home;
