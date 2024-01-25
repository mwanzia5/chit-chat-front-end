export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5555"
    : process.env.BASE_URL;
