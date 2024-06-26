import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  offers: [],
  error: null,
};

export const fetchOffers = createAsyncThunk("offer/getOffers", async () => {
  try {
    const authToken = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": authToken,
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/offer/getOffers?limit=50`,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch offers");
  }
});

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const offerReducer = offersSlice.reducer;

export default offerReducer;
export const Offers = (state: any) => state.offers.offers;
