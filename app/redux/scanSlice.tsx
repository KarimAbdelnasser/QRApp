"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  scan: "",
  error: null as string | null,
};

export const scan = createAsyncThunk("user/scan", async (userId:any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/user/scan?userId=${userId}`
    );

    sessionStorage.setItem("auth-token",response.data.token)
    return response.data;
  } catch (error:any) {
    sessionStorage.removeItem("auth-token");
    throw error.response.data.responseCode != 200;
  }
})


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
      .addCase(scan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectScanResult = (state: any) => state.scan.scan; 

export const selectOtpStatus = (state: any) => state.scan.scan.otpStatus; 

export const selectScanCardNumber = (state: any) => state.scan.scan.cardNumber; 

const scanReducer = scanSlice.reducer;

export default scanReducer;
