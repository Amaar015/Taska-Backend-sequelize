import { Router } from "express";
import { Protect } from "../middlewares/Protect.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  updateTask,
} from "../controller/taskController.js";

const router = Router();

router.post("/create-task", Protect, createTask);

router.get("/get-task", Protect, getTask);

router.get("/get-task-id", Protect, getTaskById);

router.put("/update-task/:id", Protect, updateTask);

router.delete("/delete-task", Protect, deleteTask);

export default router;
