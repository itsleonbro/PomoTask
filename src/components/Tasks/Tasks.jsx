import styles from "./Tasks.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
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

  const handleToggleStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status: task.status === "done" ? "pending" : "done" }
        : task
    );
    setTasks(updatedTasks);
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
        
      </div>

      {/* Tooltip instance */}
      <ReactTooltip id="crudBtns" place="bottom" />
    </>
  );
};

export default Tasks;
