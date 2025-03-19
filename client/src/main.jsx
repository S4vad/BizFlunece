import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./components/darkmode/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";

const clientId = import.meta.env.VITE_CLIENT_ID;
console.log("Google Client ID from env:", clientId);

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <ThemeProvider>
          <Toaster
            position="top-right"
            richColors
          />
          <App />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
