const status = document.getElementById("status");
const ram = document.getElementById("ram");
const lines = document.getElementById("lines");
const consoleContainer = document.getElementById("console-container");
const refreshButton = document.getElementById("refresh");
const noLogs = document.getElementById("no-logs");
const apiUrl = "https://api.gurizenit.site/v1/logs";

let PROMISE = Promise.resolve(true);
let LOGS_HISTORY = [];
let COOLDOWN = 5000;

document.addEventListener("DOMContentLoaded", async function () {
  setInterval(() => {
    PROMISE = PROMISE.then(() => {
      return new Promise((resolve) => {
        fetchLogs(resolve);
      });
    });
  }, 1);

  refreshButton.addEventListener("click", async () => {
    consoleContainer.innerHTML = "";
    consoleContainer.appendChild(noLogs);
    noLogs.style.display = "flex";
    LOGS_HISTORY = [];
    fetchLogs();
  });
});

let resolveArchive = false;

async function fetchLogs(resolve) {
  const response = await fetch(apiUrl).catch(() => {});

  resolveArchive = resolve ? resolve : resolveArchive;

  if (!resolve) {
    COOLDOWN = 5000;
    return resolveArchive();
  }

  if (!response) {
    console.log(
      `No response from API, trying again in ${COOLDOWN / 1000} seconds`
    );
    setTimeout(resolve, COOLDOWN);
    COOLDOWN = COOLDOWN + 5000;
    return;
  }
  
  noLogs.style.display = "none";
  COOLDOWN = 5000;

  const data = (await response.json()) || { logs: [] };

  if (data.logs.length === LOGS_HISTORY.length) {
    return resolve();
  }

  for (const [index, log] of data.logs.entries()) {
    if (LOGS_HISTORY[index] !== log) {
      LOGS_HISTORY[index] = log;
      const div = document.createElement("div");
      div.id = "console-p";
      div.innerText = log;
      consoleContainer.appendChild(div);
      consoleContainer.scrollTop = consoleContainer.scrollHeight;
    }
    lines.innerText = `lines: ${data.logs.length}`;
  }

  resolve();
}
