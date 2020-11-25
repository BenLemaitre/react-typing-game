import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ScoreProvider } from "./contexts/ScoreContext";
import { Auth0Provider } from "@auth0/auth0-react";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-u8nbzetn.us.auth0.com"
      clientId="KT2baz3AJVvxqxoGxXNNiN3Ed2TkLmdj"
      audience="https://reacttypinggame/"
    >
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
