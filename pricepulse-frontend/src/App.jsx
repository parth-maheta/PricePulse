import React from "react";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TrackedProductsPage from "./pages/TrackedProductsPage";
import TrackNewProductPage from "./pages/TrackNewProductPage";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./components/PrivateRoute";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Clerk's built-in pages */}
          <Route
            path="/signin"
            element={<SignIn routing="path" path="/signin" />}
          />
          <Route
            path="/signup"
            element={<SignUp routing="path" path="/signup" />}
          />

          {/* Protected routes */}
          <Route
            path="/tracked-products"
            element={
              <PrivateRoute>
                <TrackedProductsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/track-new"
            element={
              <PrivateRoute>
                <TrackNewProductPage />
              </PrivateRoute>
            }
          />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}
