import express from "express";
import type { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";

import { errorHandler } from "@/middlewares/error.handlers";

import * as AuthorService from "@/author/author.service";

const router = express.Router();

router
  .route("/")
  .get(async (req: Request, res: Response) => {
    try {
      const authors = await AuthorService.getAuthors();
      return res.status(200).json(authors);
    } catch (error: any) {
      return errorHandler.handleError(error, req, res);
    }
  })
  .post(
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return errorHandler.validationError(errors.array(), req, res);
        }

        const { firstName, lastName } = req.body as Omit<
          AuthorService.Author,
          "id"
        >;
        const newAuthor = await AuthorService.createAuthor({
          firstName,
          lastName,
        });
        return res.status(201).json(newAuthor);
      } catch (error: any) {
        return errorHandler.handleError(error, req, res);
      }
    }
  );

router
  .route("/:id")
  .get(
    param("id").notEmpty().withMessage("Id is required"),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return errorHandler.validationError(errors.array(), req, res);
        }

        const { id } = req.params;
        const author = await AuthorService.getAuthor(id);
        return res.status(200).json(author);
      } catch (error: any) {
        return errorHandler.handleError(error, req, res);
      }
    }
  )
  .put(
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return errorHandler.validationError(errors.array(), req, res);
        }

        const { id } = req.params;
        const { firstName, lastName } = req.body as Omit<
          AuthorService.Author,
          "id"
        >;
        const updatedAuthor = await AuthorService.updateAuthor(id, {
          firstName,
          lastName,
        });
        return res.status(200).json(updatedAuthor);
      } catch (error: any) {
        return errorHandler.handleError(error, req, res);
      }
    }
  )
  .delete(
    param("id").notEmpty().withMessage("Id is required"),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return errorHandler.validationError(errors.array(), req, res);
        }

        const { id } = req.params;
        const deletedAuthor = await AuthorService.deleteAuthor(id);
        return res.status(200).json({
          message: "Author deleted successfully!",
          author: deletedAuthor,
        });
      } catch (error: any) {
        return errorHandler.handleError(error, req, res);
      }
    }
  );

export default router;
