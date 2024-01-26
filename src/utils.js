export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "/api"
    : process.env.BASE_URL;
