// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdt8ew3_dxLT_rt7RdXaZUrNEoc32qU3I",
  authDomain: "fir-626d3.firebaseapp.com",
  projectId: "fir-626d3",
  storageBucket: "fir-626d3.appspot.com",
  messagingSenderId: "266646323718",
  appId: "1:266646323718:web:0a43658b340f772fd17987",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
