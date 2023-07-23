import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
  isAdmin: false,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    toggleAdmin: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setCurrentUser, toggleAdmin, setUserEmail } = userSlice.actions; // export action

export default userSlice.reducer; // export the reducer
