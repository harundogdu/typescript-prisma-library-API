import expres from "express";
import type { Request, Response } from "express";
import { body, validationResult, param, query } from "express-validator";

import * as BookService from "@/book/book.service";
import type { CreateBook } from "@/book/book.service";

const router = expres.Router();

router
  .route("/")
  .get(async (req: Request, res: Response) => {
    try {
      const books = await BookService.getBooks();
      return res.status(200).json(books);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
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
          return res.status(400).json({
            success: false,
            message: errors.array(),
          });
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
        return res.status(500).json({
          success: false,
          message: error.message,
        });
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
          return res.status(400).json({
            success: false,
            message: errors.array(),
          });
        }

        const { id } = req.params;
        const book = await BookService.getBook(id);
        return res.status(200).json(book);
      } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
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
          return res.status(400).json({
            success: false,
            message: errors.array(),
          });
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
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
  )
  .delete(
    query("id").notEmpty().withMessage("Id is required"),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            message: errors.array(),
          });
        }
        const { id } = req.params;
        const deleteBook = await BookService.deleteBook(id);
        return res.status(200).json(deleteBook);
      } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
  );

export { router };
