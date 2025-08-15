const addEmojiBtn = document.getElementById("addEmojiBtn");
const randomBtn = document.getElementById("randomBtn");
const copyBtn = document.getElementById("copyBtn");
const mixBtn = document.getElementById("mixBtn");
const emojiInputsDiv = document.getElementById("emojiInputs");
const resultBox = document.getElementById("result");
const historyDiv = document.getElementById("history");

let history = [];

// Add new emoji input
addEmojiBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Emoji ${emojiInputsDiv.children.length + 1}`;
  input.style.fontSize = "32px";
  emojiInputsDiv.appendChild(input);
});

// Mix emojis
mixBtn.addEventListener("click", () => {
  const emojis = Array.from(emojiInputsDiv.querySelectorAll("input"))
                      .map(input => input.value.trim())
                      .filter(e => e !== "");
  if (emojis.length === 0) {
    resultBox.textContent = "Enter at least one emoji!";
    return;
  }
  const shuffled = emojis.sort(() => 0.5 - Math.random());
  const mixed = shuffled.join("");
  resultBox.textContent = mixed;

  // Animate
  resultBox.style.transform = "scale(1.3)";
  setTimeout(() => resultBox.style.transform = "scale(1)", 300);

  // Random background
  document.body.style.background = `hsl(${Math.random()*360}, 70%, 85%)`;

  // Update history
  history.unshift(mixed);
  if (history.length > 5) history.pop();
  updateHistory();
});

// Copy to clipboard
copyBtn.addEventListener("click", () => {
  if (resultBox.textContent.trim() !== "") {
    navigator.clipboard.writeText(resultBox.textContent);
    alert("Copied to clipboard!");
  }
});

// Random emojis
randomBtn.addEventListener("click", () => {
  const sampleEmojis = ["😎","🐱","🎉","🍕","🌈","🦄","🚀","🍩","😂","🌸"];
  Array.from(emojiInputsDiv.querySelectorAll("input")).forEach(input => {
    input.value = sampleEmojis[Math.floor(Math.random()*sampleEmojis.length)];
  });
});

// Update history display
function updateHistory() {
  historyDiv.innerHTML = "";
  history.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.textContent = item;
    div.addEventListener("click", () => {
      resultBox.textContent = item;
    });
    historyDiv.appendChild(div);
  });
}
