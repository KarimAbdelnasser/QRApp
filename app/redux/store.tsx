import { configureStore } from "@reduxjs/toolkit";
import QrReducer from "./gerAllQrSlice";
import offersByNameReducer from "./offersByNameSlice";
import categoryReducer from "./categoriesSlice";
import offersReducer from "./OffersSlice";
import scanReducer from "./scanSlice";
import otpReducer from "./otpSlice"


import pinReducer from "./pinSlice";
const store = configureStore({
  reducer: {
    offers: offersReducer,
    categories: categoryReducer,
    scan: scanReducer,
    pin: pinReducer,
    offersByName: offersByNameReducer,
    QRCode: QrReducer,
   otp:otpReducer 
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
