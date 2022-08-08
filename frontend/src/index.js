import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import { HomepageProvider } from "./Components/HomepageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HomepageProvider>
      <App />
    </HomepageProvider>
  </React.StrictMode>
);
