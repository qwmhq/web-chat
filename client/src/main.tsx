import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AccountContextProvider } from "./components/AccountContextProvider.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AccountContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AccountContextProvider>
    </ThemeProvider>
  </StrictMode>,
);
