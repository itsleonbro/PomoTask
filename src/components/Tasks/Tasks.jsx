import styles from "./Tasks.module.css";

const Tasks = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2>Tasks</h2>
          </div>
          <button aria-label="Add task" title="Add task">
            +
          </button>
        </div>

        <div className={styles.tasks}>
          <div className={styles.task}>
            <div className={styles.leftSide}>
              <h3>Complete project proposal</h3>
              <div className={styles.taskInfo}>
                <div className={styles.taskStatus}>Pending</div>
                <div>0 Sessions</div>
              </div>
            </div>

            <div className={styles.rightSide}>
              <div
                className={styles.iconButton}
                aria-label="Mark complete"
                title="Mark complete"
              >
                {/* complete icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="10" fill="#e0ffe0" />
                  <path
                    d="M6 10.5L9 13.5L14 8.5"
                    stroke="#27ae60"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* edit icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#eaf6ff" />
                  <path
                    d="M13.5 6.5L14.5 7.5C14.7761 7.77614 14.7761 8.22386 14.5 8.5L8.5 14.5L5.5 15.5L6.5 12.5L12.5 6.5C12.7761 6.22386 13.2239 6.22386 13.5 6.5Z"
                    stroke="#2980b9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* delete icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#ffeaea" />
                  <path
                    d="M7 13L13 7M13 13L7 7"
                    stroke="#e74c3c"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
