CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,

  title TEXT NOT NULL,
  author TEXT,

  rating INT CHECK (rating BETWEEN 1 AND 5),

  notes TEXT,

  date_read DATE,

  cover_id TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
