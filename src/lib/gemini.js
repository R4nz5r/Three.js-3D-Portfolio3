import { SYSTEM_PROMPT, OFFLINE_FAQS } from "../constants/aiKnowledge";

const rawKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const API_KEY = rawKey.replace(/^["']|["']$/g, "").trim();
// Primary model with fallback candidates (gemini-3.6-flash is thinking-enabled)
const PRIMARY_MODEL = "gemini-3.6-flash";
const FALLBACK_MODELS = ["gemini-3.7-flash", "gemini-flash-latest"];

/**
 * Parses embedded action tokens like [ACTION:SCROLL_PROJECTS] out of the response text.
 */
export const parseActions = (text = "") => {
  if (!text || typeof text !== "string") {
    return { text: "", cleanText: "", actions: [] };
  }

  const actionRegex = /\[ACTION:(SCROLL_PROJECTS|SCROLL_CONTACT|DOWNLOAD_CV|OPEN_WHATSAPP|OPEN_LINKEDIN)\]/g;
  const actions = [];
  let match;

  while ((match = actionRegex.exec(text)) !== null) {
    const actionKey = match[1];
    switch (actionKey) {
      case "SCROLL_PROJECTS":
        actions.push({ id: "projects", label: "🚀 View Projects", type: "scroll", target: "#work" });
        break;
      case "SCROLL_CONTACT":
        actions.push({ id: "contact", label: "📬 Contact Ragib", type: "scroll", target: "#contact" });
        break;
      case "DOWNLOAD_CV":
        actions.push({ id: "cv", label: "📄 Download CV", type: "download", target: "/assets/Ragib_Shahrier_CV.pdf" });
        break;
      case "OPEN_WHATSAPP":
        actions.push({ id: "whatsapp", label: "💬 Chat on WhatsApp", type: "link", target: "https://wa.me/8801632509186" });
        break;
      case "OPEN_LINKEDIN":
        actions.push({ id: "linkedin", label: "💼 Open LinkedIn", type: "link", target: "https://www.linkedin.com/in/ragib-shahrier/" });
        break;
      default:
        break;
    }
  }

  // Clean the action tokens from the user-facing text
  const cleanText = text.replace(actionRegex, "").trim();

  return { text: cleanText, cleanText, actions };
};

/**
 * Searches offline FAQs if API key is not configured or offline.
 */
const getOfflineAnswer = (prompt) => {
  const lower = prompt.toLowerCase();
  for (const faq of OFFLINE_FAQS) {
    if (faq.keywords.some((kw) => lower.includes(kw))) {
      return faq.response;
    }
  }
  return `Hi there! I am Ragib's AI assistant. Ragib is a Full-Stack & Systems Developer specializing in React, Next.js, Three.js, C++, and AI. Feel free to explore his projects below or get in touch!
[ACTION:SCROLL_PROJECTS] [ACTION:SCROLL_CONTACT]`;
};

/**
 * Sends conversation to Google Gemini API with system instructions.
 *
 * @param {Array<{role: 'user' | 'model', text: string}>} chatHistory - Previous messages
 * @param {string} newMessage - Current user message
 * @returns {Promise<{text: string, actions: Array}>}
 */
export async function sendChatMessage(chatHistory, newMessage) {
  if (!API_KEY || API_KEY.trim() === "" || API_KEY.includes("your_api_key")) {
    console.warn("Gemini API key is not set. Using offline response.");
    const offlineReply = getOfflineAnswer(newMessage);
    const { cleanText, actions } = parseActions(offlineReply);
    return { text: cleanText, actions };
  }

  // Format history for Gemini API
  const contents = chatHistory.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  // Append new user message
  contents.push({
    role: "user",
    parts: [{ text: newMessage }],
  });

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  };

  const tryModel = async (modelName) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const rawReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response. Please try asking again.";

    return parseActions(rawReply);
  };

  try {
    return await tryModel(PRIMARY_MODEL);
  } catch (primaryErr) {
    console.warn(`Primary model ${PRIMARY_MODEL} failed (${primaryErr.message}). Trying fallbacks...`);

    for (const fallbackModel of FALLBACK_MODELS) {
      try {
        return await tryModel(fallbackModel);
      } catch (fbErr) {
        console.warn(`Fallback model ${fallbackModel} failed (${fbErr.message})`);
      }
    }

    // If all models fail, return friendly offline fallback
    console.error("All Gemini API calls failed. Falling back to local knowledge base.");
    const offlineReply = getOfflineAnswer(newMessage);
    const { cleanText, actions } = parseActions(offlineReply);
    return {
      text: `${cleanText}\n\n*(Note: Live AI service momentarily unreachable; provided from portfolio knowledge base)*`,
      actions,
    };
  }
}
