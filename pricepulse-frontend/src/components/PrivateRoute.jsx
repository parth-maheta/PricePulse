import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function PrivateRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  if (!isSignedIn) {
    // Redirect to Clerk's hosted sign-in page
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
