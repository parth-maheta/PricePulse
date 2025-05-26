import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TrackedProductsPage from "./pages/TrackedProductsPage";
import TrackNewProductPage from "./pages/TrackNewProductPage";
import Navbar from "./pages/Navbar";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}
