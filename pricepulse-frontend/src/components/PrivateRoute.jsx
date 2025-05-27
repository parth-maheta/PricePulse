import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function PrivateRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  // Wait for user data to load
  if (!isLoaded) {
    return null; // or a loading spinner
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
