const BASE_URL = "http://localhost/todolist/api/task";

const headers = { "Content-Type": "application/json" };

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, { headers, ...options });
  if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return null;
}

export async function fetchTodos() {
  return request("/read.php");
}

export async function createTodo(payload) {
  return request("/create.php", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteTodo(taskId) {
  return request("/delete.php", {
    method: "POST",
    body: JSON.stringify({ task_id: taskId }),
  });
}

export async function updateTodoStatus(taskId, status) {
  return request("/update/status.php", {
    method: "POST",
    body: JSON.stringify({ task_id: taskId, status }),
  });
}

export async function updateTodoTitle(taskId, title) {
  return request("/update/title.php", {
    method: "POST",
    body: JSON.stringify({ task_id: taskId, title }),
  });
}

export async function updateTodoDesc(taskId, desc) {
  return request("/update/desc.php", {
    method: "POST",
    body: JSON.stringify({ task_id: taskId, desc }),
  });
}
