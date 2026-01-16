import AddBookForm from "../components/AddBookForm";
import BooksList from "../components/BooksList";

const AdminBooks = () => {
  return (
    <>
      <h2>Admin Panel</h2>
      <AddBookForm />
      <BooksList isAdmin={true} />
    </>
  );
};

export default AdminBooks;
