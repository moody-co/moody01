export class AppError extends Error {
  public statusCode: number
  public code?: string

  constructor(message: string, statusCode = 400, code?: string) {
    super(message)
    this.statusCode = statusCode
    this.code = code
  }
}
