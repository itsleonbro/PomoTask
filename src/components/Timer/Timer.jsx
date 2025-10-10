import React, { useState, useEffect, useRef } from "react";
import styles from "./Timer.module.css";

const INITIAL_TIME = 25 * 60; // 25 minutes

const PomodoroCard = () => {
  const [time, setTime] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const timerRef = useRef(null);

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

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setTime(INITIAL_TIME);
    setIsRunning(false);
  };

  return (
    <div className={styles.card}>
      <h2>Pomodoro Timer</h2>

      <div className={styles.timerWrapper}>
        <div className={styles.timer}>
          <p>Working on:</p>
          <strong>Complete project proposal</strong>
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
