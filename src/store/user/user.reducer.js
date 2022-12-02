export const USER_ACTIONS = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

export const userReducer = (state = USER_ACTIONS, action) => {
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
