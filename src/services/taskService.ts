import { Task, CreateTaskInput, UpdateTaskInput } from "../types/index";

class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(input: CreateTaskInput): Task {
    const task: Task = {
      ...input,
      id: Math.random().toString(36).substring(2, 9),
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, input: UpdateTaskInput): Task | undefined {
    const existingTask = this.getTaskById(id);
    if (!existingTask) {
      return undefined;
    }

    const updatedTask: Task = {
      ...existingTask,
      ...input,
      updatedAt: new Date(),
    };
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks[index] = updatedTask;
    return updatedTask;
  }
  deleteTask(id: string): boolean {
    const updatedTasks = this.tasks.filter((task) => task.id !== id);
    const wasDeleted = updatedTasks.length < this.tasks.length;
    this.tasks = updatedTasks;
    return wasDeleted;
  }
}
