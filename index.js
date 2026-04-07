import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey:
    "sk-hc-v1-306eecc5df5a4563835750d878ac074fe1b2e73922d044cf860091ab4756331a",
  serverURL: "https://ai.hackclub.com/proxy/v1",
});

const response = await client.chat.send({
  model: "qwen/qwen3-32b",
  messages: [{ role: "user", content: "Tell me a joke." }],
  stream: false,
});

console.log(response.choices[0].message.content);
