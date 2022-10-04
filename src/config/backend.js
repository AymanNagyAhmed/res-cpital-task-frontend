export const backendURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/"
    : "http://api.pinterest.localhost/api/";
