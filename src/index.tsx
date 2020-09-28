import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "mobx-react";
import * as serviceWorker from './serviceWorker';
import theme from './global/theme';

import states from "states";
import { ThemeProvider } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider {...states}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
