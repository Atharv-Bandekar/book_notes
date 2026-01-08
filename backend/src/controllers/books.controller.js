import pool from "../db/index.js";

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      rating,
      notes,
      date_read,
      cover_id,
    } = req.body;

    // Basic validation
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await pool.query(
      `
      INSERT INTO books (title, author, rating, notes, date_read, cover_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [title, author, rating, notes, date_read, cover_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create book" });
  }
};


export const getBooks = async (req, res) => {
  try {
    const { sort } = req.query;

    let orderBy = "created_at DESC"; // default

    if (sort === "rating") {
      orderBy = "rating DESC NULLS LAST";
    } else if (sort === "recent") {
      orderBy = "date_read DESC NULLS LAST";
    } else if (sort === "title") {
      orderBy = "title ASC";
    }

    const result = await pool.query(
      `
      SELECT * FROM books
      ORDER BY ${orderBy};
      `
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};
