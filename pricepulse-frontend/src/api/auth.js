import axios from "axios";

const API = axios.create({
  baseURL: "https://pricepulse-qaeh.onrender.com", // for local testing
});

export const signup = (formData) => API.post("/api/auth/signup", formData);
export const signin = (formData) => API.post("/api/auth/signin", formData);
