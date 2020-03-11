import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "./utils/auth0-context";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#84D0FF"
    },
    secondary: {
      main: "#848FA5"
    },
    error: {
      main: "#F76F8E"
    },
    background: {
      default: "#fafafa",
      paper: "#F9FDFF"
    },
    info: {
      main: "#CCEFBD"
    },
    text: {
      primary: "#2b2a2a",
      secondary: "#777575"
    }
  },
  typography: {
    fontFamily: "Muli"
  }
});

ReactDOM.render(
  <Auth0Provider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
