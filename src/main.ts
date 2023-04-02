import * as dotenv from "dotenv";

import cors from "cors";
import express, { Request, Response } from "express";

import { router as authorRouter } from "@/author/author.router";
import { router as bookRouter } from "@/book/book.router";
import { ErrorHandler } from "@/middlewares/error.handlers";

// Config
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);
const API_PREFIX: string = process.env.API_PREFIX || "/api/v1";
const error = new ErrorHandler();

const app = express();

app.use(cors());
app.use(express.json());

app.use(`${API_PREFIX}/authors`, authorRouter);
app.use(`${API_PREFIX}/books`, bookRouter);

app.use((req: Request, res: Response) => {
  error.handleError(new Error("Not found"), req, res);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
