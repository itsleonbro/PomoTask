// routes/describe.js
import express from "express";
import { query, parseAIResponse } from "../utils/huggingface.js";

const router = express.Router();

console.log("Loaded describe router");

router.get("/", async (req, res) => {
  const { task } = req.query;
  if (!task) {
    return res.status(400).json({ success: false, error: "Task is required" });
  }

  try {
    const aiResponse = await query({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Return ONLY a short description (max 20 words) of the given task. No JSON, no extra text.",
        },
        {
          role: "user",
          content: `Describe this task: "${task}"`,
        },
      ],
      model: "deepseek-ai/DeepSeek-V3:novita",
      max_tokens: 50,
      temperature: 0.3,
    });

    // Use parser in text mode
    const parsed = parseAIResponse(aiResponse, "text", "Fallback: Could not describe task.");

    res.json({
      original_task: task,
      description: parsed.description || parsed.output,
      success: parsed.success,
    });
  } catch (error) {
    console.error("[describe] error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to describe task",
    });
  }
});

export default router;
