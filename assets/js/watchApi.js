import apiFetch from "./apiFetch.js";
import { updateLogs } from "./container.js";

const lock_button = document.getElementById("lock_button");
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

    lock_button.style.color = "#e0e0e0";

    if (data.logs) {
      updateLogs(data);
      lock_button.style.color = "#00ff00";

      auth_status
        .animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(100%)" }],
          200
        )
        .finished.then(() => {
          auth_status.style.display = "none";
        });
    } else {
      auth_status.textContent = data?.message;
      auth_status.style.position = "absolute";
      auth_status.style.bottom = "0";

      if (auth_status.style.display === "none") {
        auth_status.style.display = "block";
        auth_status.animate(
          [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
          200
        );
      }

      if (data.status !== 401) return;

      lock_button.style.color = "#d64949";
      lock_button.animate(
        [
          { transform: "translateX(30%)" },
          { transform: "translateX(-30%)" },
          { transform: "translateX(30%)" },
          { transform: "translateX(-30%)" },
        ],
        200
      );
    }
  }, INTERVAL);
};

export { watchApi, setAuthKey };
