import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const PORT = 4000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🎮 MiniGames Portal API is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

 app.patch("/tasks/:taskId/status", async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

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
    res.status(500).json({ error: "Failed to update task status" });
  }
});