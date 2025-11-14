import { api } from "./client";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function getUsers(): Promise<User[]> {
  const res = await api.get<User[]>("/users");
  return res.data;
}

// Create user
export async function createUser(data: Omit<User, "id">): Promise<User> {
  const res = await api.post<User>("/users", data);
  return res.data;
}

// Read single user
export async function getUserById(id: number): Promise<User> {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
}

// Update
export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  const res = await api.patch<User>(`/users/${id}`, data);
  return res.data;
}

// Delete
export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}