import { createSlice } from "@reduxjs/toolkit";

const emptyUser = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  createdAt: "",
  updatedAt: "",
};

const initialState = {
  userData: emptyUser,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => {
      const userObj = {
        ...action.payload,
      };

      delete userObj.password;
      delete userObj.__v;

      state.userData = userObj;
      state.isAuthenticated = true;
    },
    deleteAuthenticatedUser: (state) => {
      state.userData = emptyUser;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthenticatedUser, deleteAuthenticatedUser } =
  userSlice.actions;

export const getUser = () => (state) => state?.[userSlice.name];

export default userSlice.reducer;
