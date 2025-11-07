import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const PORT = 4000;
const prisma = new PrismaClient();

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("🎮 MiniGames Portal API is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// CRUD Endpoints for User and Task entity
// --- USERS ---

// Get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { tasks: true } });
  res.json(users);
});

// Create new user
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email, password } });
    res.status(201).json(user);
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Update user info
app.patch("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { name, email, password },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(404).json({ error: "User not found" });
  }
});

// Delete a user
app.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(userId) } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    res.status(404).json({ error: "User not found" });
  }
});

// --- TASKS ---

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({ include: { user: true } });
  res.json(tasks);
});

// Create a task for a user
app.post("/users/:userId/tasks", async (req, res) => {
  const { userId } = req.params;
  const { title, status } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId: Number(userId),
        status: status || "NOT_STARTED",
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Failed to create task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update task status
app.patch("/tasks/:taskId/status", async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "No status provided" });
  }

  if (!["NOT_STARTED", "IN_PROGRESS", "COMPLETED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updated = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { status },
    });
    res.json(updated);
  } catch (error) {
    console.error("Failed to update task status:", error);
    res.status(404).json({ error: "Task not found" });
  }
});

// Delete a task
app.delete("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(taskId) } });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Failed to delete task:", error);
    res.status(404).json({ error: "Task not found" });
  }
});