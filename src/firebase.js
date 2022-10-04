// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLzwIuFxgakPzvtCRvuq3fWUYbyfZstV4",
  authDomain: "speed-typing-test-backend.firebaseapp.com",
  projectId: "speed-typing-test-backend",
  storageBucket: "speed-typing-test-backend.appspot.com",
  messagingSenderId: "1013582850113",
  appId: "1:1013582850113:web:eb227305d37e9f4f243ec0",
  measurementId: "G-M5ZQ73SPP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);