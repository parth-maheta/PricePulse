import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // for local testing
});

export const signup = (formData) => API.post("/api/auth/signup", formData);
export const signin = (formData) => API.post("/api/auth/signin", formData);
