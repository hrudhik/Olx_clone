import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Componets/Context/Auth.jsx";
import { ItemcontextPorvider } from "./Componets/Context/Item.jsx";

createRoot(document.getElementById("root")).render(
  <ItemcontextPorvider>
    <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>
  </ItemcontextPorvider>
);
