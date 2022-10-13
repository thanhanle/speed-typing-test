// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/app";
// //import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBLzwIuFxgakPzvtCRvuq3fWUYbyfZstV4",
//   authDomain: "speed-typing-test-backend.firebaseapp.com",
//   projectId: "speed-typing-test-backend",
//   storageBucket: "speed-typing-test-backend.appspot.com",
//   messagingSenderId: "1013582850113",
//   appId: "1:1013582850113:web:eb227305d37e9f4f243ec0",
//   measurementId: "G-M5ZQ73SPP2"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);
// db.collection('todos').getDocs();
// const todosCol = collection(db, 'todos');
// const snapshot = await getDocs(todosCol);

// const analytics = getAnalytics(firebaseApp);

// // Detect auth state
// onAuthStateChanged(auth, user => {
//     if(user != null)
//     {
//         console.log('logged in');
//     } else {
//         console.log('No user');
//     }
// });


import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getFirestore } from "firebase/firestore";

// not yet
//import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBLzwIuFxgakPzvtCRvuq3fWUYbyfZstV4",
  authDomain: "speed-typing-test-backend.firebaseapp.com",
  projectId: "speed-typing-test-backend",
  storageBucket: "speed-typing-test-backend.appspot.com",
  messagingSenderId: "1013582850113",
  appId: "1:1013582850113:web:eb227305d37e9f4f243ec0",
  measurementId: "G-M5ZQ73SPP2"    
})

export const firebaseAuthentication = firebaseApp.auth();
export const firebaseFirestore = firebaseApp.firestore();
export const db = getFirestore(firebaseApp);
export default firebaseApp