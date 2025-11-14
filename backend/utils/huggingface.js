// utils/huggingface.js
import dotenv from "dotenv";
dotenv.config();

/**
 * Call HuggingFace Chat Completions API
 */
export async function query(data) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing HuggingFace API key");
  }

  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  return await response.json();
}

/**
 * Mode-aware parser for AI responses
 * @param {object} raw - HuggingFace response
 * @param {"json"|"text"} mode - Expected output type
 * @param {string} fallbackText - Default text if parsing fails
 */
export function parseAIResponse(raw, mode = "json", fallbackText = "Fallback response.") {
  try {
    const text = raw?.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return { success: false, error: "Empty response", output: fallbackText };
    }

    if (mode === "json") {
      try {
        const parsed = JSON.parse(text);
        return { success: true, ...parsed };
      } catch {
        return { success: false, error: "Invalid JSON", output: fallbackText };
      }
    }

    if (mode === "text") {
      return { success: true, description: text };
    }

    return { success: false, error: "Unknown mode", output: fallbackText };
  } catch (err) {
    return { success: false, error: err.message, output: fallbackText };
  }
}
