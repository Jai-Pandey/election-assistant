const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const express = require("express");
const cors = require("cors");

// Define the secret for the API key
const geminiApiKey = defineSecret("GEMINI_API_KEY");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Proxy endpoint for Gemini
app.post("/api/gemini", async (req, res) => {
  // Check for the unique local variable first to avoid emulator overrides
  let apiKey = process.env.LOCAL_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    try {
      apiKey = geminiApiKey.value();
    } catch (e) {
      apiKey = "";
    }
  }
  
  if (!apiKey || apiKey === "AIzaSy...") {
    console.error("GEMINI_API_KEY is missing or is the placeholder.");
    return res.status(500).json({ error: "Server configuration error: Missing API Key." });
  }

  // Log a safe hint for debugging (first and last 4 chars)
  console.log(`Using API Key: ${apiKey.substring(0, 6)}...${apiKey.slice(-4)}`);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return res.status(500).json({ error: "Gemini API error", details: data.error });
    }

    res.json(data);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Failed to connect to Gemini API" });
  }
});

// Export the Express app as a Cloud Function named 'api'
exports.api = onRequest({ 
  secrets: [geminiApiKey],
  region: "us-central1" // You can change this to your preferred region
}, app);
