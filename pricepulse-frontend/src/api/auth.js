// src/api/auth.js
import axios from "./axios"; // using the custom axios instance

export const signin = (data) => axios.post("/auth/signin", data);
export const signup = (data) => axios.post("/auth/signup", data);
