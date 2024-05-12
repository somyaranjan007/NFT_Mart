"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const userWalletInitialState = {}

const connectWallet = async () => {
    try {

    } catch (error) {
        console.log(error);
    }
}

export const connectWalletSlice = createSlice({
    name: "user wallet",
    initialState: userWalletInitialState,
    extraReducers: builder => {
        builder.addCase(connectWallet.pending, (state, action) => {}),
        builder.addCase(connectWallet.fulfilled, (state, action) => {}),
        builder.addCase(connectWallet.rejected, (state, action) => {})
    }
})

export default connectWalletSlice.reducer;