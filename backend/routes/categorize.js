import express from "express";
import { query } from "../utils/huggingface.js";

const router = express.Router();

console.log("Loaded categorize router");

router.get("/", async (req, res) => {
  console.log(`[categorize] request query:`, req.query);
  try {
    const { task } = req.query;

    if (!task) {
      console.log("[categorize] missing task param");
      return res.status(400).json({ error: "Task is required" });
    }

    // calling the query function - DeepSeek model
    const aiResponse = await query({
      messages: [
        {
          role: "system",
          content:
            "Categorize the task based on its title into one of the following categories: Work, Personal, Study, Health, Finance, Leisure, Other. Return ONLY a JSON object with a single key 'category' and the category as the value. Example: {\"category\":\"Study\"}. NO other keys or text.",
        },
        {
          role: "user",
          content: `Categorize this task: "${task}"`,
        },
      ],
      model: "deepseek-ai/DeepSeek-V3:novita",
      max_tokens: 50,
      temperature: 0.3,
    });

    console.log("[categorize] raw aiResponse:", aiResponse?.choices?.[0]?.message?.content?.slice?.(0, 200));

    let aiMessage = aiResponse.choices?.[0]?.message?.content || "";

    // strip markdown code blocks if present
    aiMessage = aiMessage
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    console.log("Cleaned AI Response:", aiMessage);

    let category;
    try {
      const parsed = JSON.parse(aiMessage);
      category = parsed.category;
      if (!category) {
        throw new Error("No category provided");
      }
    } catch (e) {
      console.error("JSON parsing error:", e.message);
      category = "Other";
    }

    res.json({
      original_task: task,
      category: category,
      success: true,
    });
  } catch (error) {
    console.error("Categorization error:", error);
    res.status(500).json({
      error: "Failed to categorize task",
      details: error.message,
    });
  }
});

export default router;
