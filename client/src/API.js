const API_URL = 'http://localhost:1337';

export const listLogEntries = async () => {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
};

export const createLogEntry = async (entry) => {
  const { apiKey } = entry;
  delete entry.apiKey;
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify(entry),
  });
  const json = await response.json();

  if (response.ok) {
    return json;
  }

  const error = new Error(json.message);
  error.response = json;
  throw error;
};

export const deleteLogEntry = async (data) => {
  const { apiKey } = data;
  delete data.apiKey;

  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();

  if (response.ok) {
    return json;
  }

  const error = new Error(json.message);
  error.response = json;
  throw error;
};
