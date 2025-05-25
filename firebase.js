import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AlzaSyCopHCRzxkdcdXXMuyEe2Cpm_bXFW8kGZc",
  authDomain: "dosti-6950f.firebaseapp.com",
  projectId: "dosti-6950f",
  storageBucket: "dosti-6950f.appspot.com",
  messagingSenderId: "493956063524",
  appId: "1:493956063524:web:3b49f450f8114bb4fd13b1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
