import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//create a react storage context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

//create a react storage provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribeFromAuth;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
