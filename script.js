const button =
  document.getElementById("submitBtn") || document.querySelector("button");

button.addEventListener("click", getValue);

async function getValue() {
  const userInput = document.getElementById("myInput").value;
  const output = document.getElementById("output");

  console.log("Button clicked");
  console.log("Input:", userInput);

  output.textContent = "Loading...";

  try {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: userInput }),
    });

    console.log("Response status:", res.status);

    const data = await res.json();
    console.log("Response data:", data);

    output.textContent = data;
  } catch (error) {
    console.error("Fetch error:", error);
    output.textContent = "Fetch failed";
  }
}
