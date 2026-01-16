import express from "express";
import {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";

import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", requireAdmin, createBook);
router.put("/:id", requireAdmin, updateBook);
router.delete("/:id", requireAdmin, deleteBook);

export default router;
