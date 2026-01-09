import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/books";

export const fetchBooks = async (sort) => {
  const response = await axios.get(API_BASE_URL, {
    params: sort ? { sort } : {},
  });
  return response.data;
};


export const createBook = async (bookData) => {
  const response = await axios.post(API_BASE_URL, bookData);
  return response.data;
};

