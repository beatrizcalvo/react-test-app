import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/material-ui.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./assets/css/app.css";

import App from "./App";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);