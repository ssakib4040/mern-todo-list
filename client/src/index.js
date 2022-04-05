import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/fonts/bootstrap-icons.js";
import "./index.css";
import App from "./App";
import EditScreen from "./EditScreen";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>

        <Route path="/edit/:id">
          <EditScreen />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
