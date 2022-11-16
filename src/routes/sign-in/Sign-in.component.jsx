import React, { useEffect } from "react";
//import { getRedirectResult } from "firebase/auth";
import {
  //auth,
  signInWithGooglePopup,
  //signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpFormComponent from "../../components/sign-up-form/Sign-up-form.component";

export default function SigninComponent() {
  //sign in with redirect
  // useEffect(() => {
  //   async function result() {
  //     const result = await getRedirectResult(auth);
  //     if (result.user) {
  //       await createUserDocumentFromAuth(result.user); //save user to firestore
  //     }
  //   }
  //   result();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user); //save user to firestore
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <SignUpFormComponent />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
}
