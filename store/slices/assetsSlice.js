import { createSlice } from "@reduxjs/toolkit"

const assetsSlice = createSlice({
    name: "assets",
    initialState: [],
    reducers: {
        setAssets: (state, action) => {
            return action.payload;
        },

        addAsset: (state, action) => {
            state.push(action.payload)
        },

        updateAssetStatus: (state, action) => {
            const { id, availabilityStatus } = action.payload
            const asset = state.find(a => a.id === id)

            if (asset) {
                asset.availabilityStatus = availabilityStatus
            }
        },

        deleteAsset: (state, action) => {
            return state.filter(asset => asset.id !== action.payload);
        }
    }
})

export const { setAssets, addAsset, updateAssetStatus, deleteAsset } = assetsSlice.actions;
export default assetsSlice.reducer