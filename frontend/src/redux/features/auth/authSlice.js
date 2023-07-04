import { createSlice } from "@reduxjs/toolkit";

const storedName = localStorage.getItem("name");
let name = "";

try {
  if (storedName && storedName !== "undefined") {
    name = JSON.parse(storedName);
  }
} catch (error) {
  console.error("Error parsing stored name:", error);
}

const initialState = {
  isLoggedIn:false,
  name: name,
  user: {
    name:"",
    email:"",
    designation:"",
    phonenumber:"",
    institnname:"",
    institnaddress:"",
  },
  };


  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      SET_LOGIN(state, action) {
        state.isLoggedIn = action.payload;
      },
      SET_NAME(state, action) {
        const name = action.payload;
        localStorage.setItem("name", JSON.stringify(name));
        state.name = name;
      },
      SET_USER(state, action) {
        const profile = action.payload;
        state.user = { ...state.user, ...profile };
      },
    },
  });
  
  export const { SET_LOGIN, SET_USER, SET_NAME } = authSlice.actions;
  export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
  export const selectName = (state) => state.auth.name;
  export const selectUser = (state) => state.auth.user;
  
  export default authSlice.reducer;