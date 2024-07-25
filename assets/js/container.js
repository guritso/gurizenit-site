const container = document.getElementById("console-container");
const lines_count = document.getElementById("lines_count");
const empty_logs = document.getElementById("empty_logs");

const oldLogs = [];
const EMPTY_LOGS_TEXT = "(ಥ _ ಥ)\nempty";

const highlightKeywords = (text) => {
  return text.replace(/(Error:)/g, '<span class="highlight-error">$1</span>');
};

const writeLogs = (newLogs) => {
  newLogs.forEach((log) => {
    const div = document.createElement("div");
    div.classList.add("container_logs");

    div.innerHTML = highlightKeywords(log);
    container.appendChild(div);

    container.scrollTop = container.scrollHeight;
    lines_count.textContent = container.children.length;
    empty_logs.textContent =
      container.children.length === 0 ? EMPTY_LOGS_TEXT : "";
  });
};

const updateLogs = ({ logs }) => {
  const newLogs = logs.filter((log, index) => oldLogs[index] !== log);

  writeLogs(newLogs);
  oldLogs.push(...newLogs);
};

const clearLogs = () => {
  oldLogs.length = 0;
  container.innerHTML = "";
  empty_logs.innerText = EMPTY_LOGS_TEXT;
  container.appendChild(empty_logs);
  lines_count.textContent = 0;
};

export { updateLogs, clearLogs };
