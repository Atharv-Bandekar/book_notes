import express from "express";
import {
  createBook,
  getBooks,
  updateBook,
} from "../controllers/books.controller.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.put("/:id", updateBook);

export default router;
