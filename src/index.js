import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC23gv9UbIIlB4AJeA0Ex1WrBXhOGf3McA",
  authDomain: "my-react-blog-b1d46.firebaseapp.com",
  projectId: "my-react-blog-b1d46",
  storageBucket: "my-react-blog-b1d46.appspot.com",
  messagingSenderId: "175910696661",
  appId: "1:175910696661:web:5822be9838f3c96982145c",
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
