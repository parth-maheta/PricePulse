import React from "react";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TrackedProductsPage from "./pages/TrackedProductsPage";
import TrackNewProductPage from "./pages/TrackNewProductPage";
import Navbar from "./pages/Navbar";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route
            path="/tracked-products"
            element={
              <SignedIn>
                <TrackedProductsPage />
              </SignedIn>
            }
          />
          <Route
            path="/track-new"
            element={
              <SignedIn>
                <TrackNewProductPage />
              </SignedIn>
            }
          />
          {/* Optional: handle signed out */}
          <Route
            path="/protected"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}
