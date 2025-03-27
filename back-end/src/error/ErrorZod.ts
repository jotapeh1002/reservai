import { ZodIssue } from "zod";

export class ErrorZod extends Error {
  public statusCode: number;
  public errors: string[];

  constructor(errors: ZodIssue[], statusCode = 400) {
    super("Erro de validação");

    this.statusCode = statusCode;
    this.errors = errors.map((error) => `${error.message} ${error.path}`)

    Object.setPrototypeOf(this, ErrorZod.prototype);
  }
}
