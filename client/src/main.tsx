import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AccountContextProvider } from "./components/AccountContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AccountContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AccountContextProvider>
  </StrictMode>,
);
