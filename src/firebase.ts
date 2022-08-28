import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyBFL4ZKCsexA7TLj8xLDDReXq7mmuP8A4Y",
   authDomain: "video-7cab7.firebaseapp.com",
   projectId: "video-7cab7",
   storageBucket: "video-7cab7.appspot.com",
   messagingSenderId: "583098595630",
   appId: "1:583098595630:web:bb1ffd79949e1efb9b22bf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
