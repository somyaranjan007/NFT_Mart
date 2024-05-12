import { configureStore } from "@reduxjs/toolkit";
import contractCredentialReducer from "./features/contractCredentialSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            contract: contractCredentialReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    })
}