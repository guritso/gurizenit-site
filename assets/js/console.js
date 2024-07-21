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
      const div = document.createElement("div");
      div.id = "console-p";
      div.innerText = log;
      consoleContainer.appendChild(div);
      consoleContainer.scrollTop = consoleContainer.scrollHeight;
    }
    lines.innerText = `lines: ${data.logs.length}`;
  }
}
