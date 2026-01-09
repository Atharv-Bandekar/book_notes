import { useState } from "react";
import { createBook } from "../api/booksApi";

const AddBookForm = ({ onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: "",
    notes: "",
    date_read: "",
  });
  

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const payload = {
        ...formData,
        rating: formData.rating ? Number(formData.rating) : null,
      };

      const newBook = await createBook(payload);

      onBookAdded(newBook);

      setFormData({
        title: "",
        author: "",
        rating: "",
        notes: "",
        date_read: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Book</h3>

      {error && <p>{error}</p>}

      <input
        name="title"
        placeholder="Title *"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
      />

      <input
        name="rating"
        type="number"
        min="1"
        max="5"
        placeholder="Rating (1–5)"
        value={formData.rating}
        onChange={handleChange}
      />

      <input
        name="date_read"
        type="date"
        value={formData.date_read}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
};

export default AddBookForm;
