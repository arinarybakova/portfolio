// frontend/src/api/tasks.ts
import { api } from "./client"; // see below for client.ts

export interface Task {
  id: number;
  title: string;
  status: string;
  completed: boolean;
  progress: number;
  userId: number;
  createdAt?: string;
}

export async function getTasks(): Promise<Task[]> {
  return api("/tasks");
}

export async function getTask(id: number): Promise<Task> {
  return api(`/tasks/${id}`);
}

export async function createTask(data: Partial<Task>) {
  return api("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTask(id: number, data: Partial<Task>) {
  return api(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteTask(id: number) {
  return api(`/tasks/${id}`, {
    method: "DELETE",
  });
}
