import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser({ ...JSON.parse(userData), token });
    }
  }, []);

  const signinUser = ({ token, name, email }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ name, email }));
    setUser({ name, email, token });
  };

  const signoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signinUser, signoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
