import React from "react";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

export default function SigninComponent() {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  return (
    <>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
    </>
  );
}
