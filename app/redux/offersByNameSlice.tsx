//USELESS
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  offersByName: [],
  error: null,
};

export const fetchOffersByName = createAsyncThunk(
  "offers/getByCategory",
  async (category:String) => {
    try {
      const authToken = localStorage.getItem("auth-token");
      const headers = {
        "auth-token": authToken,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/offer/getByCategory?category=${category}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch offers");
    }
  }
);

const offersByNameSlice = createSlice({
  name: "offersByName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersByName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffersByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.offersByName = action.payload;
      })
      .addCase(fetchOffersByName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null
      });
  },
});

export const offersByNameReducer = offersByNameSlice.reducer;

export default offersByNameReducer;
