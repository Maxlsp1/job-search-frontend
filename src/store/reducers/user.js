import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/userService";

const initialState = [];

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
    console.log('data sign up : ', data)
    const res = await UserService.signUp(data);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [signUp.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});
const { reducer } = userSlice;
export default reducer;