import { Request, Response } from "express";
import { ValidationError } from "express-validator";

class ErrorHandler {
  handleError(err: Error, req: Request, res: Response): Response {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  validationError(
    err: ValidationError[],
    req: Request,
    res: Response
  ): Response {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
}

const errorHandler = new ErrorHandler();

export { errorHandler };
