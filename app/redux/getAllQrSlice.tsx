//USELESS
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  QRCode: [],
  error: null,
};

export const fetchQrCodes = createAsyncThunk(
  "qr/getAll",
  async (adminToken:any) => {
    try {
      const authToken = adminToken
      const headers = {
        "auth-token": authToken,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/qr/getAll`,
        { headers }
      );

      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch offers");
    }
  }
);


const QrSlice = createSlice({
  name: "QRCode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQrCodes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQrCodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.QRCode = action.payload;
      })
      .addCase(fetchQrCodes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const getQRs = (state: any) => state.QRCode.QRCode; 

export const QrReducer = QrSlice.reducer;

export default QrReducer;

