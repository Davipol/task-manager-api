type Priority = "low" | "medium" | "high";
type Status = "todo" | "in-progress" | "done";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateTaskInput {
  title: string;
  description?: string;
  priority: Priority;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: Status;
  priority?: Priority;
}

interface TaskQuery {
  status?: Status;
  priority?: Priority;
}
export { Priority, Status, Task, CreateTaskInput, UpdateTaskInput, TaskQuery };
