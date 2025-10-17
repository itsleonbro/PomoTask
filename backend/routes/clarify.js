import express from "express";
import { query } from "../utils/huggingface.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { task } = req.body;

    res.json({ message: "Task clarification endpoint" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
