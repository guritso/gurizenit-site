const status = document.getElementById("status");
const ram = document.getElementById("ram");
const lines = document.getElementById("lines");
const consoleContainer = document.getElementById("console-container");
const apiUrl = "https://api.gurizenit.site/v1/logs";
// auto scroll to bottom

document.addEventListener("DOMContentLoaded", async function () {
  setInterval(fetchLogs, 500);
});

const logsHistory = [];

async function fetchLogs() {
  const response = await fetch(apiUrl);
  const data = await response.json();

  for (const [index, log] of data.logs.entries()) {
    if (logsHistory[index] !== log) {
      logsHistory[index] = log;
      const p = document.createElement("p");
      p.id = "console-p";
      p.innerText = log;
      consoleContainer.appendChild(p);
      consoleContainer.scrollTop = consoleContainer.scrollHeight;
    }
    lines.innerText = `lines: ${data.logs.length}`;
  }
}
