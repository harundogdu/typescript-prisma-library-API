import { Request, Response } from "express";

class ErrorHandler {
  handleError(err: Error, req: Request, res: Response): Response {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export { ErrorHandler };
