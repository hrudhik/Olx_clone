// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { AuthProvider } from "./Componets/Context/Auth.jsx";
// import { ItemcontextPorvider } from "./Componets/Context/Item.jsx";

// createRoot(document.getElementById("root")).render(
//   <ItemcontextPorvider>
//     <AuthProvider>
//     <StrictMode>
//       <App />
//     </StrictMode>
//   </AuthProvider>
//   </ItemcontextPorvider>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Componets/Context/Auth.jsx";
import { ItemsContextProvider } from "./Componets/Context/Item.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ItemsContextProvider>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
      ,
    </AuthProvider>
  </ItemsContextProvider>
  </BrowserRouter>

);
