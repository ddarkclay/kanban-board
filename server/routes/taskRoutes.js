import express from "express";
import { body } from "express-validator";
import { validate } from "../middlewares/validation.js";
import * as taskController from "../controllers/taskController.js";

const router = express.Router();

// Validation rules
const taskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Task title is required")
    .isString()
    .withMessage("Task title must be a string")
    .isLength({ min: 1, max: 200 })
    .withMessage("Task title must be between 1 and 200 characters"),
  body("labels")
    .isArray()
    .withMessage("Labels must be an array")
    .custom((labels) => {
      if (!labels.every((label) => typeof label === "string")) {
        throw new Error("All labels must be strings");
      }
      return true;
    }),
  body("boardId")
    .notEmpty()
    .withMessage("Board ID is required")
    .isInt()
    .withMessage("Board ID must be an integer"),
  validate,
];

// Update validation has optional fields
const updateTaskValidation = [
  body("title")
    .optional()
    .isString()
    .withMessage("Task title must be a string")
    .isLength({ min: 1, max: 200 })
    .withMessage("Task title must be between 1 and 200 characters"),
  body("labels")
    .optional()
    .isArray()
    .withMessage("Labels must be an array")
    .custom((labels) => {
      if (!labels.every((label) => typeof label === "string")) {
        throw new Error("All labels must be strings");
      }
      return true;
    }),
  body("boardId").optional().isInt().withMessage("Board ID must be an integer"),
  validate,
];

// Routes
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskValidation, taskController.createTask);
router.put("/:id", updateTaskValidation, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
