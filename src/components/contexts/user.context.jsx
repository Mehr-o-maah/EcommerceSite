import { createContext, useState } from "react";

//create a react storage context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

//create a react storage provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
