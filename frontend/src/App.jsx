import BooksList from "./components/BooksList";

function App() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <h1>Book Notes</h1>
      <BooksList />
    </div>
  );
}

export default App;
