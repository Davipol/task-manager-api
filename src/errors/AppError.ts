class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "AppError";
    //Proper instance of check
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(404, `${resource} with id "${id}" not found`, "NOT_FOUND");
  }
}
class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message, "VALIDATION_ERROR");
  }
}
class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, message, "UNAUTHORIZED_ACCESS");
  }
}
export { AppError, NotFoundError, ValidationError, UnauthorizedError };
