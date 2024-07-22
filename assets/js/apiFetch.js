const url = "https://api.gurizenit.site/v1";

const apiFetch = {
  get: async (options) => {
    const response = await fetch(`${url}/${options.endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${options.token}`,
      },
    });
    if (!response?.ok) {
      throw new Error(`HTTP error! status: ${response?.status}`);
    }

    const data = await response.json();

    if (data.message) {
      console.log(data.message);
    }
    return data;
  },
};

export default apiFetch;