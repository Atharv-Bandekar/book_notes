export const validateBookPayload = (data) => {
  const { title, rating } = data;

  if (!title || typeof title !== "string") {
    return "Title is required and must be a string";
  }

  if (rating !== undefined) {
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return "Rating must be a number between 1 and 5";
    }
  }

  return null;
};
