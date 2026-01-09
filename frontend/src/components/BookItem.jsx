import { useState } from "react";
import { updateBook, deleteBook } from "../api/booksApi";

const BookItem = ({ book, onBookUpdated, onBookDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author || "",
    rating: book.rating || "",
    notes: book.notes || "",
    date_read: book.date_read || "",
  });

  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
    : null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const payload = {
      ...formData,
      rating: formData.rating ? Number(formData.rating) : null,
    };

    const updated = await updateBook(book.id, payload);
    onBookUpdated(updated);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteBook(book.id);
    onBookDeleted(book.id);
  };

  if (isEditing) {
    return (
      <li>
        <input name="title" value={formData.title} onChange={handleChange} />
        <input name="author" value={formData.author} onChange={handleChange} />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
        />
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </li>
    );
  }

return (
  <li style={{ display: "flex", gap: "12px", alignItems: "center" }}>
    {coverUrl && (
      <img
        src={coverUrl}
        alt={book.title}
        width="60"
        height="90"
        loading="lazy"
      />
    )}

    <div>
      <strong>{book.title}</strong>
      {book.author && ` — ${book.author}`}
      {book.rating && ` ⭐ ${book.rating}`}

      <div>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </li>
);

};

export default BookItem;
