import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NFTMarketPlaceABI, NFTMarketPlaceAddress } from "@/constants/constants";
import { ethers } from "ethers";
import { EthereumProvider } from "@walletconnect/ethereum-provider";


const contractCredentialInitial = {
    provider: null,
    signer: null,
    contract: null,
    isLoading: false,
    error: null
}

export const createContractCredentials = createAsyncThunk("create/contractCredentials", async (chainConfiguration) => {
    try {

        const provider = await EthereumProvider.init({
            projectId: '0f7bd4259d7ae896904800174911d61d',
            metadata: {
                name: 'NFT-Mart',
                description: 'NFT Market Place',
                url: 'http://localhost:3000',
                icons: ['']
            },
            showQrModal: true,
            optionalChains: [chainConfiguration?.chainId],
            rpcMap: {
                [chainConfiguration?.chainId]: chainConfiguration?.rpcUrl,
            }
        })

        const signer = provider.signer;
        const contract = new ethers.Contract(NFTMarketPlaceAddress, NFTMarketPlaceABI, signer);
        return { provider, signer, contract }
    } catch (error) {
        return error
    }
})

export const createCntractCredentialsSlice = createSlice({
    name: "create/contractCredentials",
    initialState: contractCredentialInitial,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(createContractCredentials.pending, state => {
            state.isLoading = true;
        })
        builder.addCase(createContractCredentials.fulfilled, (state, action) => {
            state.isLoading = false;
            state.provider = action.payload.provider;
            state.signer = action.payload.signer;
            state.contract = action.payload.contract;
        })
        builder.addCase(createContractCredentials.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export default createCntractCredentialsSlice.reducer;