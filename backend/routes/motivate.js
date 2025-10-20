import express from "express";
import { query } from "../utils/huggingface.js";

const router = express.Router();
const prompt =
  "You are a motivational performance coach. Consider both the user's completed tasks and current tasks. Generate ONE short inspiring quote (max 15 words) that connects past accomplishments to ongoing effort and future progress. Return ONLY the quote text, with no quotation marks, emojis, or explanations.";

router.get("/", async (req, res) => {
  try {
    const currentTask = req.query.task || "task completion";
    // calling the query function - DeepSeek model
    const aiResponse = await query({
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `Generate a motivational quote for ${currentTask}`,
        },
      ],
      model: "deepseek-ai/DeepSeek-V3:novita",
      max_tokens: 50,
      temperature: 0.7,
    });
    console.log("Raw Hugging Face response:", JSON.stringify(aiResponse, null, 2));

    // parse the AI's response
    let quote = aiResponse.choices?.[0]?.message?.content?.trim();
    console.log(quote);
    // clean up the quote
    if (quote) {
      // remove any surrounding quotes
      quote = quote.replace(/^["']|["']$/g, "");
      // ensure it's not too long
      if (quote.length > 100) {
        quote = quote.substring(0, 97) + "...";
      }
    } else {
      // fallback quote
      quote = "Great job! Keep the momentum going!";
    }

    res.json({
      quote: quote,
      success: true,
    });
  } catch (error) {
    console.error("Motivation error:", error);
    res.status(500).json({
      error: "Failed to generate motivation",
      details: error.message,
    });
  }
});

export default router;
