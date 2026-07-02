import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Global error handler for debugging
window.onerror = (msg, url, line, col, error) => {
  console.error("LIDEX System Error:", { msg, url, line, col, error });
  return false;
};
