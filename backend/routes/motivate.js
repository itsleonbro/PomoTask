// routes/motivate.js
import express from "express";
import { query } from "../utils/huggingface.js";

const router = express.Router();

console.log("Loaded motivate router");

const prompt =
  "You are a motivational performance coach. Consider both the user's completed tasks and current tasks. Generate ONE short inspiring quote (max 15 words) that connects past accomplishments to ongoing effort and future progress. Return ONLY the quote text, with no quotation marks, emojis, or explanations.";

router.get("/", async (req, res) => {
  try {
    const currentTask = req.query.task || "task completion";

    // Call HuggingFace
    const aiResponse = await query({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: `Generate a motivational quote for ${currentTask}` },
      ],
      model: "deepseek-ai/DeepSeek-V3:novita",
      max_tokens: 50,
      temperature: 0.7,
    });

    console.log("Raw Hugging Face response:", JSON.stringify(aiResponse, null, 2));

    // Extract and clean the quote
    let quote = aiResponse.choices?.[0]?.message?.content?.trim();
    console.log("Generated quote:", quote);

    if (quote) {
      // Remove any surrounding quotes
      quote = quote.replace(/^["']|["']$/g, "");
      // Ensure it's not too long
      if (quote.length > 100) {
        quote = quote.substring(0, 97) + "...";
      }
    } else {
      // Fallback quote
      quote = "Great job! Keep the momentum going!";
    }

    res.json({
      original_task: currentTask,
      quote,
      success: true,
    });
  } catch (error) {
    console.error("[motivate] error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate motivation",
      details: error.message,
    });
  }
});

export default router;
