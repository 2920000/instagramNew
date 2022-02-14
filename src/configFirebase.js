import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeojraLIS6DXK_0yHhIACLyHGH2T2D1Cw",
  authDomain: "instagramnew-2d85c.firebaseapp.com",
  projectId: "instagramnew-2d85c",
  storageBucket: "instagramnew-2d85c.appspot.com",
  messagingSenderId: "235639649186",
  appId: "1:235639649186:web:0b225ae6e96375a5e9f8fb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
