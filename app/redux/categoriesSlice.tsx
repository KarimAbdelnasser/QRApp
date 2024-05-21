//USELESS
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  error: null,
  categories: []
};

export const fetchCategories = createAsyncThunk(
  "offers/categories",
  async () => {
    try {
      const authToken = sessionStorage.getItem("auth-token");
      const headers = {
        "auth-token": authToken,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_QR_SERVER_URL}/offer/categories`,
        { headers }
      );

      console.log(response)

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch categotries");
    }
  }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.categories = action.payload; 
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.isLoading = false;
          state.error = null
        });
    },
  });

export const getCategoriesC = (state: any) => state.categories.categories.data; 

export const categoryReducer = categoriesSlice.reducer;

export default categoryReducer;
