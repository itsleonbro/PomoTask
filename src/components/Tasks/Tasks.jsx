import styles from "./Tasks.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [expandedTasks, setExpandedTasks] = useState(new Set());
  const [loadingTasks, setLoadingTasks] = useState(new Set());

  const labelMappings = {
    tm: "Time needed",
    bt: "Best time",
    pre: "Prerequisites",
    nrg: "Energy level",
    rem: "Reminder",
    loc: "Location",
    tl: "Tools",
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleDelete = id => {
    const updatedTask = tasks.filter(task => task.id !== id);
    setTasks(updatedTask);

    // clean up expanded state
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleEdit = (id, currentTitle) => {
    setEditTaskId(id);
    setEditedTitle(currentTitle);
  };

  const handleToggleStatus = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === "done" ? "pending" : "done" }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleSaveEdit = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, title: editedTitle } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditedTitle("");
  };

  const handleAISuggestions = async taskId => {
    const task = tasks.find(t => t.id === taskId);

    // Toggle expansion state
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });

    // if AI suggestions already exist just toggle visibility
    if (task.aiSuggestions) {
      return;
    }

    // Fetch AI suggestions
    setLoadingTasks(prev => new Set(prev).add(taskId));

    try {
      const response = await axios.post("http://localhost:5001/api/clarify", {
        task: task.title,
      });

      if (response.data.success && response.data.task_context) {
        const updatedTasks = tasks.map(t =>
          t.id === taskId
            ? { ...t, aiSuggestions: response.data.task_context }
            : t
        );
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      alert("Failed to get AI suggestions. Please try again.");

      // remove from expanded if error occurs
      setExpandedTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    } finally {
      setLoadingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      status: "pending",
      sessions: 0,
      aiSuggestions: null,
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
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className={styles.taskInput}
                autoFocus
              />
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => {
                    setShowForm(false);
                    setNewTask("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Add Task
                </button>
              </div>
            </div>
          </form>
        )}
        <div className={styles.tasks}>
          {tasks.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📝</div>
              <h3 className={styles.emptyTitle}>No tasks yet</h3>
              <p className={styles.emptyMessage}>
                Click the + button above to add your first task and start being
                productive!
              </p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={styles.taskWrapper}>
                <div className={styles.task}>
                  <div className={styles.leftSide}>
                    {editTaskId === task.id ? (
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={e => setEditedTitle(e.target.value)}
                        onBlur={() => handleSaveEdit(task.id)}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            handleSaveEdit(task.id);
                          } else if (e.key === "Escape") {
                            setEditTaskId(null);
                            setEditedTitle("");
                          }
                        }}
                        className={styles.editInput}
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
                      <span
                        onClick={() => handleAISuggestions(task.id)}
                        title="AI Suggestions"
                        className={styles.aiButton}
                      >
                        {expandedTasks.has(task.id) ? (
                          <FaChevronUp color="#8b5cf6" size={25} />
                        ) : (
                          <FaRobot color="#8b5cf6" size={25} />
                        )}
                      </span>

                      <span onClick={() => handleToggleStatus(task.id)}>
                        <FaCheckCircle
                          color={task.status === "done" ? "#65a30d" : "#a3a3a3"}
                          size={25}
                        />
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

                {/* AI section */}
                {expandedTasks.has(task.id) && (
                  <div className={styles.aiSuggestionsSection}>
                    {loadingTasks.has(task.id) ? (
                      <div className={styles.loading}>Loading...</div>
                    ) : task.aiSuggestions ? (
                      <div className={styles.aiSuggestions}>
                        {Object.entries(task.aiSuggestions).map(
                          ([key, value]) => (
                            <div key={key} className={styles.suggestionItem}>
                              <span className={styles.suggestionLabel}>
                                {labelMappings[key]}:
                              </span>
                              <span className={styles.suggestionValue}>
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tooltip instance */}
      <ReactTooltip id="crudBtns" place="bottom" />
    </>
  );
};

export default Tasks;
