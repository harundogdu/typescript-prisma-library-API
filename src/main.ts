import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { authorRouter } from "./author/author.router";

// Config
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/authors", authorRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
