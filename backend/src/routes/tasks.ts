import { Router } from "express";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const router = Router();

// CREATE: Add new task
router.post("/", async (req, res) => {
  try {
    const task = await prisma.task.create({
      data: req.body, // expects title, status, userId
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// READ all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// READ single task
router.get("/:id", async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// UPDATE task
router.patch("/:id", async (req, res) => {
  try {
    const updated = await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: req.body, // can update title, status, userId
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
