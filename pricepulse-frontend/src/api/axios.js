import { useAuth } from "@clerk/clerk-react";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

instance.interceptors.request.use(async (config) => {
  const { getToken } = useAuth();
  if (getToken) {
    const token = await getToken(); // gets Clerk JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default instance;
