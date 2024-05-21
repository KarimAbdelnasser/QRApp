//USELESS
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null as string | null,
};

export const activateUser = createAsyncThunk("/user/createCard", async () => {
  try {
    const authToken = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": authToken,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/user/createCard`,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
});

const activateUserSlice = createSlice({
  name: "activateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(activateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(activateUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const activateUserReducer = activateUserSlice.reducer;

export default activateUserReducer;
