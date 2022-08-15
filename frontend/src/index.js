import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import { HomepageProvider } from "./Components/HomepageContext";
import { AccountProvider } from "./Components/AccountContext";
import { FavsProvider } from "./Components/FavsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AccountProvider>
      <FavsProvider>
        <HomepageProvider>
          <App />
        </HomepageProvider>
      </FavsProvider>
    </AccountProvider>
  </React.StrictMode>
);
