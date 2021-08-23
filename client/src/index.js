import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";

import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";
import Store from "./Store"

Store.dispatch(getUsers());
Store.dispatch(getPosts());

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
