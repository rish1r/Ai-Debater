import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey:
    "",
  serverURL: "https://ai.hackclub.com/proxy/v1",
});

const response = await client.chat.send({
  model: "qwen/qwen3-32b",
  messages: [{ role: "user", content: "Tell me a joke." }],
  stream: false,
});

console.log(response.choices[0].message.content);
