from openrouter import OpenRouter

client = OpenRouter(
    api_key="sk-hc-v1-306eecc5df5a4563835750d878ac074fe1b2e73922d044cf860091ab4756331a",
    server_url="https://ai.hackclub.com/proxy/v1",
)

response = client.chat.send(
    model="openai/gpt-5-mini",
    messages=[
        {"role": "user", "content": "explain  me derivatives."}
    ],
    stream=False,
)

print(response.choices[0].message.content)