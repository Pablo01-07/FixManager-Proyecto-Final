import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: "filter",
    initialState: "Todos",
    reducers: {
        setFilter: (state, action) => {
            return action.payload
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer