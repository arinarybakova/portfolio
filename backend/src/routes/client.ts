import axios from "axios";

// Adjust this if backend runs on a different port or machine
export const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});
