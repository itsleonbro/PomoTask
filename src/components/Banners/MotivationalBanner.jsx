import { useState, useEffect } from "react";
import styles from "./MotivationalBanner.module.css";

const MotivationalBanner = () => {
  const [quote, setQuote] = useState("Stay focused and keep pushing forward!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Placeholder for now - will be replaced with API call later
  useEffect(() => {
    // TODO: Fetch from /api/motivate endpoint
    // For now, using static placeholder
  }, []);

  return (
    <div className={styles.banner}>
      {loading ? (
        <p>Loading quote...</p>
      ) : error ? (
        <p>Failed to load quote</p>
      ) : (
        <p className={styles.quote}>"{quote}"</p>
      )}
    </div>
  );
};

export default MotivationalBanner;
