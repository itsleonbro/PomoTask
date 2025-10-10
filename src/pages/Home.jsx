import styles from "./Home.module.css";
import Timer from "../components/Timer/Timer";
import Tasks from "../components/Tasks/Tasks";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <Timer />
        <Tasks />
      </div>
    </>
  );
};

export default Home;
