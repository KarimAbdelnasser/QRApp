//USELESS
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null as string | null,
};

export const createdCard = createAsyncThunk("/user/createCard", async () => {
  try {
    const authToken = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": authToken,
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/user/createCard`,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
});

const createCardSlice = createSlice({
  name: "createCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createdCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createdCard.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createdCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const createdCardReducer = createCardSlice.reducer;

export default createdCardReducer;
