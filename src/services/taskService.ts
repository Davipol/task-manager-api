import { Task, CreateTaskInput, UpdateTaskInput } from "../types/index";

class Logger {
  constructor(private context: string) {}

  log(message: string): void {
    console.log(`[${this.context}] ${message}`);
  }
}

export class TaskService {
  private logger = new Logger("TaskService");
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  public createTask(input: CreateTaskInput): Task {
    const task: Task = {
      ...input,
      id: Math.random().toString(36).substring(2, 9),
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(task);
    this.logger.log(`Task created: ${task.id}`);
    return task;
  }

  public updateTask(id: string, input: UpdateTaskInput): Task | undefined {
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
    this.logger.log(`Task Updated:${id}`);
    return updatedTask;
  }
  public deleteTask(id: string): boolean {
    const updatedTasks = this.tasks.filter((task) => task.id !== id);
    const wasDeleted = updatedTasks.length < this.tasks.length;
    this.tasks = updatedTasks;
    if (wasDeleted) this.logger.log(`Task deleted: ${id}`);
    return wasDeleted;
  }
}
