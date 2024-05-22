"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  scan: "",
  error: null as string | null,
  errorData: {},
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
      })
      .addCase(scan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scan = action.payload; // Set scan result here
        state.error = null;
      })
      .addCase(scan.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errorData = action.payload.response.data;
        state.error = action.payload.response.data.responseMessage || null;
      });
  },
});

export const selectScanResult = (state: any) => state.scan.scan;

export const selectOtpStatus = (state: any) => state.scan.scan.otpStatus;

export const selectScanCardNumber = (state: any) => state.scan.scan.cardNumber;

const scanReducer = scanSlice.reducer;

export default scanReducer;
