import { Priority, Status, CreateTaskInput } from "../types";

//Type guards

const isValidPriority = (value: unknown): value is Priority => {
  return value === "low" || value === "medium" || value === "high";
};

const isValidStatus = (value: unknown): value is Status => {
  return value === "todo" || value === "in-progress" || value === "done";
};

const isCreateTaskInput = (value: unknown): value is CreateTaskInput => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { title?: unknown }).title === "string" &&
    isValidPriority((value as { priority?: unknown }).priority)
  );
};
