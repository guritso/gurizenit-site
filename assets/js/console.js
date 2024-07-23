import apiFetch from "./apiFetch.js";
import { updateLogs, clearLogs } from "./container.js";
import { watchApi, setAuthKey } from "./watchApi.js";

const lock_button = document.getElementById("lock_button");
const refresh_button = document.getElementById("refresh_button");
const auth_input = document.getElementById("auth_input");

let AUTH_KEY;
let ANIMATION_DURATION = 300;

document.addEventListener("DOMContentLoaded", () => {
  watchApi();

  fetchLogs().then((data) => {
    if (!data?.message) {
      updateLogs(data);
    }
  });

  lock_button.addEventListener("click", handleLockButtonClick);
  refresh_button.addEventListener("click", handleRefreshButtonClick);
  auth_input.addEventListener("input", handleAuthInputChange);
  auth_input.addEventListener("keydown", handleAuthInputKeydown);
  auth_input.addEventListener("blur", handleAuthInputFocusOut);
});

async function handleLockButtonClick() {
  lock_button.style.display = "none";
  auth_input.style.display = "flex";

  await auth_input.animate(
    [{ transform: "translateX(200%)" }, { transform: "translateX(0)" }],
    ANIMATION_DURATION
  ).finished;

  auth_input.focus();
}

async function handleRefreshButtonClick() {
  // rotate to the right
  refresh_button.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    ANIMATION_DURATION
  );
  clearLogs();
  fetchLogs().then((data) => {
    if (!data?.message) {
      updateLogs(data);
    }
  });
}

async function handleAuthInputChange() {
  updateKey();
}

function handleAuthInputFocusOut() {
  updateKey();
  AuthInputCloseAnimation();
}

function handleAuthInputKeydown(e) {
  const INPUT_KEYS = ["Enter", "Escape"];

  if (INPUT_KEYS.includes(e.key)) {
    updateKey();
    AuthInputCloseAnimation();
  }
}

async function AuthInputCloseAnimation() {
  await auth_input.animate(
    [{ transform: "translateX(0)" }, { transform: "translateX(200%)" }],
    ANIMATION_DURATION
  ).finished;
  auth_input.style.display = "none";
  lock_button.style.display = "flex";
}

async function fetchLogs() {
  const data = await apiFetch.get({
    endpoint: "logs",
    token: AUTH_KEY,
  });

  return data;
}

async function updateKey() {
  AUTH_KEY = auth_input.value;
  setAuthKey(AUTH_KEY);
}
