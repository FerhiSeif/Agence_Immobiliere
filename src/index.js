import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";
import "./index.css";
import { CometChat } from '@cometchat-pro/chat';
import config from './config';
const firebase = require("firebase");
require("firebase/firestore"); // Required for side-effects?????
import registerServiceWorker from './registerServiceWorker';
CometChat.init(config.appID)
firebase.initializeApp({
  apiKey: "AIzaSyCz_Qxs6WXHBsIB4C5dUFloHo1Y5Hi0kU4",
    authDomain: "chatapplication-8ead5.firebaseapp.com",
    databaseURL: "https://chatapplication-8ead5.firebaseio.com",
    projectId: "chatapplication-8ead5",
    storageBucket: "chatapplication-8ead5.appspot.com",
    messagingSenderId: "1060360248814",
    appId: "1:1060360248814:web:c3723f53f5ab4c9d2282ff"
})
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
