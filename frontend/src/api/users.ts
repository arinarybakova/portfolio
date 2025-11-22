import { api } from "./client";

export function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return api("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getUser(id: number) {
  return api(`/users/${id}`);
}

export function updateUser(id: number, data: any) {
  return api(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteUser(id: number) {
  return api(`/users/${id}`, {
    method: "DELETE",
  });
}
