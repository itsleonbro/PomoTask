import styles from "./Tasks.module.css";
import { FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const Tasks = () => {
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
          >
            <FaPlus />
          </button>
        </div>

        <div className={styles.tasks}>
          <div className={styles.task}>
            <div className={styles.leftSide}>
              <h3>Complete project proposal</h3>
              <div className={styles.taskInfo}>
                <div className={styles.taskStatus}>pending</div>
                <div className={styles.taskSessions}>0 Sessions</div>
              </div>
            </div>

            <div className={styles.rightSide}>
              <div className={styles.iconButtons}>
                {/* complete icon */}
                <span>
                  <FaCheckCircle color="#65a30d" size={25} />
                </span>

                {/* edit icon */}
                <span>
                  <FaPen color="#2563eb" size={25} />
                </span>

                {/* delete icon */}
                <span>
                  <FaRegTrashAlt color="#dc2626" size={25} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
