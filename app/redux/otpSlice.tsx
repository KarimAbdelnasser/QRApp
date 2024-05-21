//IMPORTANT
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, successToast } from "../components/AlertTimer";

const initialState = {
  isLoading: true,
  otpSendingStatus: "",
  otpConfirmation: false,
  error: null,
};

export const sendOTP = createAsyncThunk(
  "user/sendOtp",
  async (brand:any) => {
    try {
      const authToken = sessionStorage.getItem("auth-token");

      const headers = {
        "auth-token": authToken,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/user/sendOtp`,
        { brand },
        { headers }
      );
      console.log(response.data)
      successToast(response.data.responseMessage);
      return response.data;
    } catch (error:any) {
      errorToast(error.response.data.responseMessage);
      throw new Error("Failed to fetch offers");
    }
  }
);

export const verifyOtp = createAsyncThunk(
    "user/verifyOtp",
    async (otp:any) => {
      try {
        const authToken = sessionStorage.getItem("auth-token");
  
        const headers = {
          "auth-token": authToken,
        };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/user/verifyOtp`,
          { otp },
          { headers }
        );
        console.log(response.data)
        successToast(response.data.responseMessage);
        return response.data;
      } catch (error:any) {
        errorToast(error.response.data.responseMessage);
        throw new Error("Failed to fetch offers");
      }
    }
  );

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true;
        state.otpSendingStatus = "pending";
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.otpSendingStatus = "Sent";
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.otpSendingStatus = "failed";
        state.error = null
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.otpConfirmation = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.otpConfirmation = false;
        state.error = null
      });
  },
});

export const getOTPConfirmation = (state: any) => state.otp.otpConfirmation; 

export const otpReducer = otpSlice.reducer;

export default otpReducer;
