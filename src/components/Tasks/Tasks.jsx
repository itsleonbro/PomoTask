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
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  };

  const handleEdit = (id, currentTitle) => {
    setEditTaskId(id);
    setEditedTitle(currentTitle);
  };

  const handleSaveEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: editedTitle } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditedTitle("");
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
                {editTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={() => handleSaveEdit(task.id)}
                    autoFocus
                  />
                ) : (
                  <h3>{task.title}</h3>
                )}

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
                  <span onClick={() => handleEdit(task.id, task.title)}>
                    <FaPen color="#2563eb" size={25} />
                  </span>

                  <span onClick={() => handleDelete(task.id)}>
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
