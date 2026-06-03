import { Router, Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/response";
import { TaskService } from "../services/taskService";
import { isCreateTaskInput, isUpdateTaskInput } from "../utils/validators";
import { NotFoundError, ValidationError } from "../errors/AppError";
import { TaskQuery } from "../types/index";

const router = Router();
const taskService = new TaskService();

router.get(
  "/tasks",
  (req: Request<{}, {}, {}, TaskQuery>, res: Response, next: NextFunction) => {
    try {
      const tasks = taskService.getAllTasks();
      const { status, priority } = req.query;
      const filtered = tasks
        .filter((task) => !status || task.status === status)
        .filter((task) => !priority || task.priority === priority);
      res.json(successResponse(filtered));
    } catch (err) {
      next(err);
    }
  },
);
router.get("/tasks/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const task = taskService.getTaskById(id);
    if (!task) {
      throw new NotFoundError("Task", id);
    }
    res.json(successResponse(task));
  } catch (err) {
    next(err);
  }
});
router.post("/tasks", (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = req.body;
    if (!isCreateTaskInput(task)) {
      throw new ValidationError("Invalid request body");
    } else {
      const created = taskService.createTask(task);
      res.status(201).json(successResponse(created));
    }
  } catch (err) {
    next(err);
  }
});
router.patch(
  "/tasks/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      if (!isUpdateTaskInput(req.body)) {
        throw new ValidationError("Invalid request body");
      }
      const updated = taskService.updateTask(id, req.body);
      if (!updated) {
        throw new NotFoundError("Task", id);
      }
      res.json(successResponse(updated));
    } catch (err) {
      next(err);
    }
  },
);
router.delete(
  "/tasks/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const deleted = taskService.deleteTask(id);
      if (!deleted) {
        throw new NotFoundError("Task", id);
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
);
export default router;
