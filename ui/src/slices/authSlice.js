import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  user :localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setUser(state,value){
      state.token= value.payload;
    },

  },
});

export const { setSignupData, setToken,setUser} = authSlice.actions;

export default authSlice.reducer;