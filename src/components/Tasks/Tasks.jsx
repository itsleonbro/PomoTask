import styles from "./Tasks.module.css";
import { FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      status: "pending",
      sessions: 0,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    setShowForm(false);
  };

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
        <div className={styles.header}>
          <div>
            <h2>Tasks</h2>
          </div>
          <button
            className={styles.addBtn}
            aria-label="Add task"
            title="Add task"
            onClick={handleAddClick}
          >
            <FaPlus />
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task title"
            />
            <button type="submit">Save</button>
          </form>
        )}
        <div className={styles.tasks}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.task}>
              <div className={styles.leftSide}>
                <h3>{task.title}</h3>
                <div className={styles.taskInfo}>
                  <div className={styles.taskStatus}>{task.status}</div>
                  <div className={styles.taskSessions}>
                    {task.sessions} Sessions
                  </div>
                </div>
              </div>

              <div className={styles.rightSide}>
                <div className={styles.iconButtons}>
                  <span>
                    <FaCheckCircle color="#65a30d" size={25} />
                  </span>
                  <span>
                    <FaPen color="#2563eb" size={25} />
                  </span>
                  <span>
                    <FaRegTrashAlt color="#dc2626" size={25} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tasks;
