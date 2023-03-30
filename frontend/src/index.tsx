import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Web3Provider } from "context/Web3Context";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>

    <BrowserRouter>

        <Web3Provider>

          <Provider store={store}>

            <App />

          </Provider>

        </Web3Provider>

    </BrowserRouter>
    
  </React.StrictMode>
);
