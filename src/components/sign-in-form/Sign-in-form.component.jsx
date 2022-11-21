import React, { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input-component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

export default function SignInFormComponent() {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formFields;

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      //console.log(response.user);
    } catch (error) {
      const errorCodes = {
        "auth/user-not-found": "User not found. Please sign up.",
        "auth/wrong-password": "Wrong password. Please try again.",
      };
      alert(errorCodes[error.code]);
    }
  };

  //!not in use
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div>
      <h2>Already have an account?</h2>
      <form onSubmit={onSubmitForm}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={onChangeInput}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChangeInput}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
