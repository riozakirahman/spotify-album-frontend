import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { LoggedContextProvider } from "./contexts/LoggedContext";
import { ArtistContextProvider } from "./contexts/ArtistContext";
import { UserContextProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoggedContextProvider>
      <ArtistContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ArtistContextProvider>
    </LoggedContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
