/* script.js */
const OPENAI_API_URL = 'http://localhost:8080/api/doubt-solver/ask';

document.addEventListener("DOMContentLoaded", function () {
  // Ask Doubt functionality
  const askBtn = document.getElementById("askBtn");
  const doubtResponse = document.getElementById("doubtResponse");
  
  if (askBtn) {
    askBtn.addEventListener("click", async function () {
      const doubtInput = document.getElementById("doubtInput").value.trim();
      if (!doubtInput) {
        doubtResponse.innerHTML = "<span class='text-danger'>⚠ Please enter a doubt first!</span>";
        return;
      }
      doubtResponse.innerHTML = "<span class='text-warning'>⏳ Thinking...</span>";
      try {
        const response = await fetch(OPENAI_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doubt: doubtInput })
        });
        const data = await response.json();
        if (data.answer) {
          doubtResponse.innerHTML = `<strong>🤖 AI:</strong> ${data.answer}`;
        } else {
          doubtResponse.innerHTML = "<span class='text-danger'>⚠ Error fetching response.</span>";
        }
      } catch (error) {
        doubtResponse.innerHTML = "<span class='text-danger'>⚠ Server error. Please try again later.</span>";
      }
    });
  }
  
  // Dark mode toggle functionality
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
    });
  }
});
