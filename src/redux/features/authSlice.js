import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  Register manually enter email password
    setToken: (state, { payload }) => {
      localStorage.setItem("token", payload);
      state.token = payload;
    },

    //set user
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
