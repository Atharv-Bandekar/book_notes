import express from "express";
import dotenv from "dotenv";
import pool from "./db/index.js";

import booksRoutes from "./routes/books.routes.js";


dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/books", booksRoutes);


const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
