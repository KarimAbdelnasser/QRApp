//USELESS
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null as string | null,
};

export const deActivateUser = createAsyncThunk("/user/deactivate", async () => {
  try {
    const authToken = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": authToken,
    };
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/user/deactivate`,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
});

const deActivateUserSlice = createSlice({
  name: "deActivateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deActivateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deActivateUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deActivateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const deActivateUserReducer = deActivateUserSlice.reducer;

export default deActivateUserReducer;
