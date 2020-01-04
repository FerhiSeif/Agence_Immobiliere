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
//import registerServiceWorker from './registerServiceWorker';
import * as serviceWorker from "./registerServiceWorker";
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
    <Provider store = { store } >
    <App/>
    </Provider>,

    document.getElementById("root")
);
/* Notification service worker check */
const check = () => {
    if (!("serviceWorker" in navigator)) {
        throw new Error("No Service Worker support!");
    }
    if (!("PushManager" in window)) {
        throw new Error("No Push API Support!");
    }
};

const registerServiceWorker = async() => {
    const swUrl = `${process.env.PUBLIC_URL}/sw-push.js`;
    console.log("swUrl", swUrl);

    const swRegistration = await navigator.serviceWorker.register(swUrl, {
        scope: "/worker/"
    });
    return swRegistration;
};

const requestNotificationPermission = async() => {
    //const permission = await window.Notification.requestPermission();

    Notification.requestPermission(status => {
        console.log("Notification permission status:", status);
    });

    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.

    // if (permission !== "granted") {
    //   throw new Error("Permission not granted for Notification");
    // }
};

const main = async() => {
    check();
    const swRegistration = await registerServiceWorker();
    const permission = await requestNotificationPermission();

    console.log("swReg", swRegistration);

    if (Notification.permission == "granted") {
        navigator.serviceWorker.getRegistration("/worker/").then(reg => {
            console.log("About to show notification", reg);
            reg.showNotification("Hello world!");
        });

        // navigator.serviceWorker.ready.then(function(reg) {
        //   new Notification("Helo");
        // });
    }
};

main();