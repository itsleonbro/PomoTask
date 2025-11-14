import express from "express";
import { query, parseAIResponse } from "../utils/huggingface.js";

const router = express.Router();

console.log("Loaded categorize router");

router.get("/", async (req, res) => {
  console.log(`[categorize] request query:`, req.query);

  try {
    const { task } = req.query;

    if (!task) {
      return res
        .status(400)
        .json({ success: false, error: "Task is required" });
    }

    // Call HuggingFace
    const aiResponse = await query({
      messages: [
        {
          role: "system",
          content:
            "Categorize the task based on its title. Think carefully, propose the best-fit category, and return JSON with keys: category, confidence, rationale, alternatives[].",
        },
        {
          role: "user",
          content: `Categorize this task: "${task}"`,
        },
      ],
      model: "deepseek-ai/DeepSeek-V3:novita",
      max_tokens: 150,
      temperature: 0.3,
    });

    // Use the centralized parser
    const parsed = parseAIResponse(
      aiResponse,
      "text",
      "Fallback: Could not describe task."
    );

    res.json({
      original_task: task,
      ...parsed, // includes steps, summary, success
    });
  } catch (error) {
    console.error("Categorization error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to categorize task",
    });
  }
});

export default router;
