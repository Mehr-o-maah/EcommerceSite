import { useState, FormEvent, ChangeEvent } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { setCurrentUser } from "../../redux/user.reducer";
import { useDispatch } from "react-redux";

import { FormInputComponent } from "../form-input/form-input-component";
import "./sign-in-form.styles.scss";
import { Button } from "../button/button.component";

export default function SignInFormComponent() {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formFields;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      ////console.log(response.user);
    } catch (error: any) {
      const errorCodes = {
        "auth/user-not-found": "User not found. Please sign up.",
        "auth/wrong-password": "Wrong password. Please try again.",
      };
      const code: keyof typeof errorCodes = error.code;
      alert(errorCodes[code]);
    }
  };

  //set user and dispatch
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    //console.log(user?.displayName);

    user && dispatch(setCurrentUser(user?.displayName || user?.email));
  };

  //sign in
  const signIn = () => {
    onAuthStateChangedListener(
      (user: { displayName: string; email: string }) => {
        //console.log("User: ", user);
        if (user) {
          createUserDocumentFromAuth(user);
        }
        user && dispatch(setCurrentUser(user?.displayName || user?.email));
      }
    );
  };

  return (
    <div>
      <h2>Already have an account?</h2>
      <form onSubmit={onSubmitForm}>
        <FormInputComponent
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={onChangeInput}
          required
        />
        <FormInputComponent
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChangeInput}
          required
        />
        <div className="buttons-container">
          <Button onClick={signIn} type="submit">
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
