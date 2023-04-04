import * as dotenv from "dotenv";

import cors from "cors";
import express, { Request, Response } from "express";
import swagger from "swagger-ui-express";

import { errorHandler } from "@/middlewares";

import { authorRouter } from "@/author";
import { bookRouter } from "@/book";

import { swaggerDocument, browserList } from "@/lib";

// Config
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);
const API_PREFIX: string = process.env.API_PREFIX || "/api/v1";

const app = express();

app.use(cors());
app.use(express.json());

app.use(`${API_PREFIX}/authors`, authorRouter);
app.use(`${API_PREFIX}/books`, bookRouter);
app.use(`${API_PREFIX}/docs`, swagger.serve, swagger.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
  if (
    req.headers["user-agent"] &&
    browserList.some((browser) =>
      req.headers["user-agent"]?.includes(browser.name)
    )
  ) {
    res.redirect(`${API_PREFIX}/docs`);
  }

  res.json({
    message: "Welcome to the Bookstore API",
    documentation: `${API_PREFIX}/docs`,
  });
});

app.use((req: Request, res: Response) => {
  errorHandler.handleError(new Error("Not found"), req, res);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
