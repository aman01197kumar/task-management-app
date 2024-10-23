import express from "express";
import { taskController } from "../controller/taskController.js";

const router = express.Router();

router.get("/tasks", taskController.getAllTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.delete ("/removeAll", taskController.removeAll);

export default router;
