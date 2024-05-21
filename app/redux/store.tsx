import { configureStore } from "@reduxjs/toolkit";
import QrReducer from "./getAllQrSlice";
import offersByNameReducer from "./offersByNameSlice";
import categoryReducer from "./categoriesSlice";
import offersReducer from "./OffersSlice";
import scanReducer from "./scanSlice";
import verifyReducer from "./verifySlice";
import createdCardReducer from "./createCardSlice";
import activateUserReducer from "./activateUserSlice";
import deActivateUserReducer from "./deActivateUserSlice";
import otpReducer from "./otpSlice";
const store = configureStore({
  reducer: {
    offers: offersReducer,
    categories: categoryReducer,
    scan: scanReducer,
    verify: verifyReducer,
    offersByName: offersByNameReducer,
    QRCode: QrReducer,
    createCard: createdCardReducer,
    activateUser: activateUserReducer,
    deActivateUser: deActivateUserReducer,
    otp: otpReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
