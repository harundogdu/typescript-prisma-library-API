import express from "express";
import type { Request, Response } from "express";
import { body, validationResult, param, query } from "express-validator";

import { errorHandler } from "@/middlewares/error.handlers";

import * as BookService from "@/book/book.service";
import type { CreateBook } from "@/book/book.service";

const router = express.Router();

router
  .route("/")
  .get(async (req: Request, res: Response) => {
    try {
      const { limit } = req.query;
      const books = await BookService.getBooks(Number(limit));
      return res.status(200).json(books);
    } catch (error: any) {
      return errorHandler.handleError(error, req, res);
    }
  })
  .post(
    body("authorId").notEmpty().withMessage("Author id is required"),
    body("pageSize").notEmpty().withMessage("Page size is required"),
    body("publishedDate").notEmpty().withMessage("Published date is required"),
    body("title").notEmpty().withMessage("Title is required"),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return errorHandler.validationError(errors.array(), req, res);
        }

        const { authorId, pageSize, publishedDate, title } =
          req.body as BookService.CreateBook;

        const createdBook = BookService.createBook({
          authorId,
          pageSize,
          publishedDate,
          title,
        });

        return res.status(201).json(createdBook);
      } catch (error: any) {
        return errorHandler.handleError(error, req, res);
      }
    }
  );

router
  .route(":id")
  .get(
    query("id").notEmpty().withMessage("Id is required"),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return errorHandler.validationError(errors.array(), req, res);
        }

        const { id } = req.params;
        const book = await BookService.getBook(id);
        return res.status(200).json(book);
      } catch (error: any) {
        return errorHandler.handleError(error, req, res);
      }
    }
  )
  .put(
    body("authorId").notEmpty().withMessage("Author id is required"),
    body("pageSize").notEmpty().withMessage("Page size is required"),
    body("publishedDate").notEmpty().withMessage("Published date is required"),
    body("title").notEmpty().withMessage("Title is required"),
    param("id").notEmpty().withMessage("Id is required"),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return errorHandler.validationError(errors.array(), req, res);
        }

        const { id } = req.params;
        const { authorId, pageSize, publishedDate, title } =
          req.body as CreateBook;
        const updatedBook = await BookService.updateBook(id, {
          authorId,
          pageSize,
          publishedDate,
          title,
        });
        return res.status(200).json(updatedBook);
      } catch (error: any) {
        return errorHandler.handleError(error, req, res);
      }
    }
  )
  .delete(
    query("id").notEmpty().withMessage("Id is required"),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return errorHandler.validationError(errors.array(), req, res);
        }
        const { id } = req.params;
        const deleteBook = await BookService.deleteBook(id);
        return res.status(200).json(deleteBook);
      } catch (error: any) {
        return errorHandler.handleError(error, req, res);
      }
    }
  );

export default router;
