import { PrismaClient } from "@prisma/client";
import { errorHandler } from "../middlewares/errorHandler.js";

const prisma = new PrismaClient();

export const getAllBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(boards);
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const getBoardById = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await prisma.board.findUnique({
      where: { id: Number(id) },
      include: { tasks: true },
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    return res.status(200).json(board);
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const createBoard = async (req, res) => {
  try {
    const { name } = req.body;

    const newBoard = await prisma.board.create({
      data: { name },
    });

    return res.status(201).json(newBoard);
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedBoard = await prisma.board.update({
      where: { id: Number(id) },
      data: { name },
    });

    return res.status(200).json(updatedBoard);
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.board.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  } catch (error) {
    return errorHandler(res, error);
  }
};
