import { PrismaClient } from "@prisma/client";
import { errorHandler } from "../middlewares/errorHandler.js";

const prisma = new PrismaClient();

export const getAllTasks = async (req, res) => {
  try {
    const { boardId } = req.query;

    const whereClause = boardId ? { boardId: Number(boardId) } : {};

    const tasks = await prisma.task.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        board: true,
      },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: { board: true },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, labels, boardId } = req.body;

    // Verify board exists
    const board = await prisma.board.findUnique({
      where: { id: Number(boardId) },
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        labels,
        boardId: Number(boardId),
      },
    });

    return res.status(201).json(newTask);
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, labels, boardId } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (labels !== undefined) updateData.labels = labels;
    if (boardId !== undefined) {
      // Verify board exists if boardId is being updated
      const board = await prisma.board.findUnique({
        where: { id: Number(boardId) },
      });

      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      updateData.boardId = Number(boardId);
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  } catch (error) {
    return errorHandler(res, error);
  }
};
