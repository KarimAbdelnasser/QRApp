
"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { successToast } from "../components/AlertTimer";
import { errorToast } from '../components/AlertTimer';
const initialState = {
  isLoading: false,
  error: null as string | null,
  exists: false,
};

export const verification = createAsyncThunk(
  "/user/verifyPin",
  async ({ pin }: { pin: string}) => {
    try {
      const authToken = localStorage.getItem("auth-token");
      const headers = {
        "auth-token": authToken,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/user/verifyPin`,
        { pin },
        { headers }
      );

      
      successToast(response.data.responseMessage); 
      return response.data.responseMessage;
    } catch (error:any) {
    
      throw errorToast(error.response.data.responseMessage);
    }
  })

const pinSlice = createSlice({
  name: "pin",
  initialState: {
    isLoading: false,
    error: null as string | null,
    exists: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.exists = true;
      })
      .addCase(verification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const pinReducer = pinSlice.reducer;

export default pinReducer;
