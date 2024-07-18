// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDSGoXjUvNHrSmt1dHAybMH5DS459pYzqU",
  authDomain: "fullstack-ecomerce-website.firebaseapp.com",
  projectId: "fullstack-ecomerce-website",
  storageBucket: "fullstack-ecomerce-website.appspot.com",
  messagingSenderId: "93908940126",
  appId: "1:93908940126:web:77b16d139d5b4ab7c6cbcf",
  measurementId: "G-BENQ9CZBZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export app and analytics
export { app, analytics };
