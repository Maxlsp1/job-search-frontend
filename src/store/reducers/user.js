import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/userService";

const initialState = {

  user: {},
  token: {},
  authSuccess: false
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (data) => {
    const res = await UserService.signIn(data);
    return res.data;
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (data) => {
    const res = await UserService.signUp(data);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      console.log('im in sign in')
      return{
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authSuccess: action.payload.authSuccess
      }      
    },
    [signUp.fulfilled]: (state, action) => {
      console.log('im in sign up')
      return{
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authSuccess: action.payload.authSuccess
      }
    },
  },
});
const { reducer } = userSlice;
export default reducer;