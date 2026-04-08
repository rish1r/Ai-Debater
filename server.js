import express from "express";
import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const client = new OpenRouter({
  apiKey: process.env.API_KEY,
  serverURL: "https://ai.hackclub.com/proxy/v1",
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api", async (req, res) => {
  try {
    const { input } = req.body;
    console.log("Received input:", input);
    console.log("API key exists:", !!process.env.API_KEY);

    if (!input) {
      return res.status(400).json("No input provided");
    }

    const response = await client.chat.send({
      chatRequest: {
        model: "qwen/qwen3-32b",
        messages: [{ role: "user", content: input }],
        stream: false,
      },
    });
    console.log("Full API response:", response);

    const text = response.choices?.[0]?.message?.content ?? "No response";
    res.json(text);
  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json("Something went wrong on the backend");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
