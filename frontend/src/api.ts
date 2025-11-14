export const apiUrl = "http://localhost:4000";

export const getUsers = async () => {
  const res = await fetch(`${apiUrl}/users`);
  return res.json();
};

export const getUser = async (id: number) => {
  const res = await fetch(`${apiUrl}/users/${id}`);
  return res.json();
};

export const updateUser = async (id: number, data: any) => {
  const res = await fetch(`${apiUrl}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteUser = async (id: number) => {
  const res = await fetch(`${apiUrl}/users/${id}`, { method: "DELETE" });
  return res.json();
};

export const getTasks = async () => {
  const res = await fetch(`${apiUrl}/tasks`);
  return res.json();
};

export const getTask = async (id: number) => {
  const res = await fetch(`${apiUrl}/tasks/${id}`);
  return res.json();
};

export const updateTask = async (id: number, data: any) => {
  const res = await fetch(`${apiUrl}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
