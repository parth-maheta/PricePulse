import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TrackedProductsPage from "./pages/TrackedProductsPage";
import TrackNewProductPage from "./pages/TrackNewProductPage";
import Navbar from "./pages/Navbar"; // 👈 make sure the path is correct

export default function App() {
  return (
    <Router>
      <Navbar /> {/* 👈 Placed outside Routes so it's always visible */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tracked-products" element={<TrackedProductsPage />} />
        <Route path="/track-new" element={<TrackNewProductPage />} />
      </Routes>
    </Router>
  );
}
