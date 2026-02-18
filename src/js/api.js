const API_BASE_URL = "/api/tasks";

async function request(endpoint, options) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getTasks() {
  return request("", { method: "GET" });
}

export function createTask(task) {
  return request("", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export function updateTask(taskId, task) {
  return request(`/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
}

export function deleteTask(taskId) {
  return request(`/${taskId}`, {
    method: "DELETE",
  });
}
