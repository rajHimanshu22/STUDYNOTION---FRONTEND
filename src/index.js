import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

// create store - ye krte hai using configureStore
const store = configureStore({ // yaha pass the reducers
  reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

//-----------------------------------------------------------------------
//  -- REACT ROUTER --
//React Router is a standard library for routing in React. It enables navigation between different components in a
//React application, allows the browser URL to be changed, and keeps the UI in sync with the URL.
//React Router can be installed in your React application via npm.

// --  BROWSER ROUTER --
// BrowserRouter is a router implementation.to keep your UI in sync with the URL.
//It is the parent component used to store all other components.
// The whole app goes here.
//BrowserRouter is top level component. It creates a history (navigation history), put the initial location
//(router object representing "where the user is at") into the react state and finally subscribes to the location URL.
