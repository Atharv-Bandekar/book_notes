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

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      rating,
      notes,
      date_read,
      cover_id,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await pool.query(
      `
      UPDATE books
      SET
        title = $1,
        author = $2,
        rating = $3,
        notes = $4,
        date_read = $5,
        cover_id = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *;
      `,
      [title, author, rating, notes, date_read, cover_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update book" });
  }
};

