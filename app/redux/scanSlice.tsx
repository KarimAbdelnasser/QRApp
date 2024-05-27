"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  scan: {},
  error: null as string | null,
  errorData: {},
  errorStatus: false,
};

export const scan = createAsyncThunk(
  "user/scan",
  async (userId: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/user/scan?userId=${userId}`
      );

      sessionStorage.setItem("auth-token", response.data.token);
      return response.data;
    } catch (error: any) {
      sessionStorage.removeItem("auth-token");
      return rejectWithValue(error);
    }
  }
);

const scanSlice = createSlice({
  name: "scan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.scan = {};
        state.errorData = {};
        state.errorStatus = false;
      })
      .addCase(scan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scan = action.payload;
        state.error = null;
        state.errorStatus = false;
      })
      .addCase(scan.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errorData = action.payload.response.data;
        state.error = action.payload.response.data.responseMessage || null;
        state.errorStatus = true;
      });
  },
});

export const ScanResult = (state: any) => state.scan.scan;
export const ScanCardNumber = (state: any) => state.scan.scan.cardNumber;
export const OtpStatus = (state: any) => state.scan.scan.otpStatus;

const scanReducer = scanSlice.reducer;

export default scanReducer;
