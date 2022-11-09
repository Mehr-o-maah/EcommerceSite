import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZIJ32DFH_HJ5Vj7f-BCIamDfDuYM5PC8",

  authDomain: "crown-clothing-db-8f6b8.firebaseapp.com",

  projectId: "crown-clothing-db-8f6b8",

  storageBucket: "crown-clothing-db-8f6b8.appspot.com",

  messagingSenderId: "125295517940",

  appId: "1:125295517940:web:070d1c836da2671c553ea1",

  measurementId: "G-MPGDP658C5",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  //crea el documento si no existe
  const userDocSnapshot = await getDoc(userDocRef);
  if (!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating the user ", error.message);
    }
    return userDocRef;
  }
};
