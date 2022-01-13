import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";

// import { BrowserRouter as Router } from "react-router-dom";
// const routerBaseName = process.env.PUBLIC_URL;
// ReactDOM.render(
//   <Router basename={routerBaseName}>
//     < App />
//   </Router>, document.getElementById("root")
//   );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
