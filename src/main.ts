import * as dotenv from "dotenv";

import cors from "cors";
import express from "express";

import { authorRouter } from "./author/author.router";
import { bookRouter } from "./book/book.router";

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

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
