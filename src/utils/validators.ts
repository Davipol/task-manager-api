import { Priority, Status, CreateTaskInput, UpdateTaskInput } from "../types";

//Type guards

export const isValidPriority = (value: unknown): value is Priority => {
  return value === "low" || value === "medium" || value === "high";
};

export const isValidStatus = (value: unknown): value is Status => {
  return value === "todo" || value === "in-progress" || value === "done";
};

export const isCreateTaskInput = (value: unknown): value is CreateTaskInput => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { title?: unknown }).title === "string" &&
    isValidPriority((value as { priority?: unknown }).priority)
  );
};

export const isUpdateTaskInput = (value: unknown): value is UpdateTaskInput => {
  if (typeof value !== "object" || value === null) return false;
  const input = value as { title?: unknown; description?: unknown; status?: unknown; priority?: unknown };
  if (input.title !== undefined && typeof input.title !== "string") return false;
  if (input.description !== undefined && typeof input.description !== "string") return false;
  if (input.status !== undefined && !isValidStatus(input.status)) return false;
  if (input.priority !== undefined && !isValidPriority(input.priority)) return false;
  return true;
};
