import express from "express";
import { createBook } from "../controllers/books.controller.js";

const router = express.Router();

router.post("/", createBook);

export default router;
