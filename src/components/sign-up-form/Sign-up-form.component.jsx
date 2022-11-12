import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

export default function SignUpFormComponent() {
  const [formFields, setFormFields] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = formFields;

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    createAuthUserWithEmailAndPassword(email, password, displayName);
    console.log("formFields", formFields);
  };

  return (
    <div>
      <h1>Sign up with your email</h1>
      <form onSubmit={onSubmitForm}>
        <label>Display Name</label>
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={onChangeInput}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChangeInput}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChangeInput}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeInput}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
