import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey =
  pk_test_ZmFpdGhmdWwtaG9uZXliZWUtMzIuY2xlcmsuYWNjb3VudHMuZGV2JA;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
