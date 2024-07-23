const url = "https://api.gurizenit.site/v1";

const apiFetch = {
  get: async (options) => {
    const response = await fetch(`${url}/${options.endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options.token}`,
      },
    }).catch(() => {});

    if (!response) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        message: data.message || response.statusText,
      };
    } else {
      return data;
    }
  },
};

export default apiFetch;
