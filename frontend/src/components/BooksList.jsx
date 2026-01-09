import { useEffect, useState } from "react";
import { fetchBooks } from "../api/booksApi";
import AddBookForm from "./AddBookForm";


const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBookAdded = (newBook) => {
     setBooks((prev) => [newBook, ...prev]); 
  };


  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(sort);
        setBooks(data);
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [sort]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

return (
  <div>
    <h2>My Books</h2>

    <AddBookForm onBookAdded={handleBookAdded} />

    <label>
      Sort by:{" "}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="recent">Recency</option>
        <option value="rating">Rating</option>
        <option value="title">Title</option>
      </select>
    </label>

    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <strong>{book.title}</strong>
          {book.author && ` — ${book.author}`}
          {book.rating && ` ⭐ ${book.rating}`}
        </li>
      ))}
    </ul>
  </div>
);
};


export default BooksList;
