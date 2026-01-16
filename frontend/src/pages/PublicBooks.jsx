import BooksList from "../components/BooksList";

const PublicBooks = () => {
  return (
    <>
      <h2>My Books</h2>
      <BooksList isAdmin={false} />
    </>
  );
};

export default PublicBooks;
