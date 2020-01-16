import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
// Middleware
import promise from "redux-promise";
import thunk from "redux-thunk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Style
import "./index.css";
import "./include/bootstrap";

toast.configure();

// see https://github.com/zalmoxisus/redux-devtools-extension
let devTools = undefined;
//eslint-disable-next-line
if (process.env.NODE_ENV === "development") {
  devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

const rootReducer = combineReducers({
  form: formReducer
});
const store = applyMiddleware(thunk, promise)(createStore)(
  rootReducer,
  devTools
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App></App>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
