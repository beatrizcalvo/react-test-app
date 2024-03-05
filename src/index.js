import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/material-ui.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

serviceWorker.unregister();