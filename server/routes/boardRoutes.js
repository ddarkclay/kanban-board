import express from "express";
import { body } from "express-validator";
import { validate } from "../middlewares/validation.js";
import * as boardController from "../controllers/boardController.js";

const router = express.Router();

// Validation rules
const boardValidation = [
  body("name")
    .notEmpty()
    .withMessage("Board name is required")
    .isString()
    .withMessage("Board name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Board name must be between 1 and 100 characters"),
  validate,
];

// Routes
router.get("/", boardController.getAllBoards);
router.get("/:id", boardController.getBoardById);
router.post("/", boardValidation, boardController.createBoard);
router.put("/:id", boardValidation, boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);

export default router;
