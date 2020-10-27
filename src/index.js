import React from "react";
import { render } from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { store } from './_helpers';

import App from "./App";

render(
    <Provider
      store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
