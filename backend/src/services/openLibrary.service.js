import axios from "axios";

export const fetchCoverIdByTitle = async (title) => {
  try {
    const response = await axios.get(
      "https://openlibrary.org/search.json",
      {
        params: { title, limit: 1 },
      }
    );

    const doc = response.data.docs?.[0];

    if (!doc) return null;

    // Prefer cover_i if available
    return doc.cover_i || null;
  } catch (error) {
    console.error("Open Library API error:", error.message);
    return null;
  }
};
