import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    profileImage: null
};

const authsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = {
                email: action.payload.email,
                localId: action.payload.localId
            };
            state.token = action.payload.idToken;
            state.profileImage = null
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.profileImage = null
        },

        setProfileImage: (state, action) => {
            state.profileImage = action.payload
        }
    }
})

export const { setUser, logout, setProfileImage } = authsSlice.actions
export default authsSlice.reducer