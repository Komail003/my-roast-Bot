// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU0xLBfjrz84piQbdP48JYODhR1eCefz4",
  authDomain: "generated-arena-443910-s4.firebaseapp.com",
  projectId: "generated-arena-443910-s4",
  storageBucket: "generated-arena-443910-s4.firebasestorage.app",
  messagingSenderId: "868411728836",
  appId: "1:868411728836:web:8b47321fb79cbbd937ba91",
  measurementId: "G-020X4B77L0",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Gemini via Firebase AI SDK
const ai = getAI(app, { backend: new GoogleAIBackend() });
export const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });
