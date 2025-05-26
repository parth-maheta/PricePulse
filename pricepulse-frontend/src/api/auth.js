import axios from "axios";

const API_BASE = "http://localhost:5000/api/auth"; // replace with your backend URL

export const signin = (data) => axios.post(`${API_BASE}/signin`, data);
export const signup = (data) => axios.post(`${API_BASE}/signup`, data);
