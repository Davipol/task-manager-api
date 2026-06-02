/*Create src/routes/tasks.ts with Express routes:
  GET    /tasks        - return all tasks
  GET    /tasks/:id    - return a single task
  POST   /tasks        - create a task (validate body with your type guard)
  PATCH  /tasks/:id    - update a task
  DELETE /tasks/:id    - delete a task
  */
import { Router, Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/response";
import { TaskService } from "../services/taskService";
import { isCreateTaskInput, isUpdateTaskInput } from "../utils/validators";
const router = Router();
const taskService = new TaskService();

router.get("/tasks", (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = taskService.getAllTasks();
    res.json(successResponse(tasks));
  } catch (err) {
    next(err);
  }
});
router.get("/tasks/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const task = taskService.getTaskById(id);
    res.json(successResponse(task));
  } catch (err) {
    next(err);
  }
});
router.post("/tasks", (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = req.body;
    if (!isCreateTaskInput(task)) {
      return res.status(400).json(errorResponse("Bad request"));
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
        return res.status(400).json(errorResponse("Invalid request body"));
      }
      const updated = taskService.updateTask(id, req.body);
      if (!updated) {
        return res.status(404).json(errorResponse("Task not found"));
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
        return res.status(404).json(errorResponse("Task not found"));
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
);
export default router;
