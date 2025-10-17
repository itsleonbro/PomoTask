import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// HF query function
async function query(data) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

// task categorizer endpoint
app.post("/api/categorize", async (req, res) => {
  try {
    const { task } = req.body;
    //logic
    res.json({ message: "Task categorization endpoint" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// task clarifier endpoint
app.post("/api/clarify", async (req, res) => {
  try {
    const { task } = req.body;
    // logic
    res.json({ message: "Task clarification endpoint" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// motivator endpoint
app.post("/api/motivate", async (req, res) => {
  try {
    const { context } = req.body;
    // logic
    res.json({ message: "Motivation endpoint" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
