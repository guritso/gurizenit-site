import apiFetch from "./apiFetch.js";
import { updateLogs } from "./container.js";

const auth_status = document.getElementById("auth_status");

const INTERVAL = 1000;
let AUTH_KEY = "";

const setAuthKey = (authKey) => {
  AUTH_KEY = authKey;
};

const watchApi = () => {
  setInterval(async () => {
    const data = await apiFetch.get({
      endpoint: "logs",
      token: AUTH_KEY,
    });

    if (data.logs) {
      updateLogs(data);
      auth_status.textContent = "";
    } else {
      auth_status.textContent = data?.message;
    }
  }, INTERVAL);
};

export { watchApi, setAuthKey };
