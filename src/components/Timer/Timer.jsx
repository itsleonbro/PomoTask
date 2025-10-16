import React, { useState, useEffect, useRef } from "react";
import styles from "./Timer.module.css";
import { FaRegClock } from "react-icons/fa";

const INITIAL_TIME = 10; // 25 minutes
const STORAGE_KEY = "pomodoro-timer-state";

const loadTimerState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error("Failed to load timer state:", error);
  }

  return null;
};

const PomodoroCard = ({ activeTaskId, setActiveTaskId, tasks }) => {
const savedState = loadTimerState();

const [time, setTime] = useState(savedState?.time ?? INITIAL_TIME);
const [isRunning, setIsRunning] = useState(savedState?.isRunning ?? false);
const [sessionsCompleted, setSessionsCompleted] = useState(savedState?.sessionsCompleted ?? 0);
const [activeTaskTitle, setActiveTaskTitle] = useState("");

  const timerRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData("text/plain");
    const newActiveTaskId = Number(droppedId);
    if (newActiveTaskId !== activeTaskId) {
      setSessionsCompleted(0);
      localStorage.removeItem(STORAGE_KEY);
    }
    setActiveTaskId(newActiveTaskId);
  };

  function saveTimerState(timerState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timerState));
    } catch (error) {
      console.error("Failed to save timer state:", error);
    }
  }

  useEffect(() => {
  saveTimerState({ time, isRunning, sessionsCompleted });
}, [time, isRunning, sessionsCompleted]);

  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setSessionsCompleted((prev) => prev + 1);
      setIsRunning(false);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, time]);

  useEffect(() => {
    const timerState = {
      time,
      isRunning,
      sessionsCompleted,
      timestamp: Date.now(),
    };
    saveTimerState(timerState);
  }, [time, isRunning, sessionsCompleted]);

  useEffect(() => {
    const activeTask = tasks.find(task => task.id === activeTaskId);
    setActiveTaskTitle(activeTask?.title ?? "");
  }, [activeTaskId, tasks]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartPause = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setTime(INITIAL_TIME);
    setIsRunning(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (

    <div className={styles.card} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>
          <span className={styles.clockIcon}>
            <FaRegClock className={styles.icon} />
          </span>
          Pomodoro Timer
        </h2>
      </div>
      <div className={styles.timerWrapper}>
        <div className={styles.timer}>
          <p>Working on:</p>
          <strong>{activeTaskTitle || "No task selected"}</strong>
          <p>Sessions completed: {sessionsCompleted}</p>
          <h1 className={styles.timeDisplay}>{formatTime(time)}</h1>
        </div>
      </div>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${(time / INITIAL_TIME) * 100}%` }}
        ></div>
      </div>

      <div className={styles.buttons}>
        <button
          className={`${styles.pauseBtn} ${isRunning ? styles.running : ""}`}
          onClick={handleStartPause}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className={styles.resetBtn} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroCard;
