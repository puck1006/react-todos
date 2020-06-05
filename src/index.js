import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Todo from "./todo.jsx";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Todo />
  </React.StrictMode>,
  rootElement
);
