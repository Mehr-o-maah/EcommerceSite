import React, { useEffect } from "react";
//import { getRedirectResult } from "firebase/auth";
import SignUpFormComponent from "../../components/sign-up-form/Sign-up-form.component";
import SignInFormComponent from "../../components/sign-in-form/Sign-in-form.component";
import "./authentication.style.scss";

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

  return (
    <div className="authentication-container">
      <SignInFormComponent />
      <SignUpFormComponent />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
}
