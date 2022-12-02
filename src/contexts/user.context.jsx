import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//create a react storage context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const USER_ACTIONS = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  //use object literal
  const actions = {
    [USER_ACTIONS.SET_CURRENT_USER]: () => ({
      ...state,
      currentUser: action.payload,
    }), //this is a function that returns an object

    //default case
    default: () => state, //return the state
  };
  //console.log("userReducer", action.payload);
  //use the actions object to call the function
  return actions[action.type] ? actions[action.type]() : actions.default();
};

//create a react storage provider
export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(userReducer, { currentUser: null });
  const { currentUser } = state;
  //console.log("currentUser", currentUser);
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTIONS.SET_CURRENT_USER, payload: user });
  };

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
