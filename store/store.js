import { configureStore } from "@reduxjs/toolkit"
import reportsReducer from "./slices/reportsSlice"
import assetsReducer from "./slices/assetsSlice"
import authReducer from "./slices/authsSlice"

import themeReducer from "./slices/themesSlice"

import { firebaseApi } from "../services/firebaseApi"
import { authApi } from "../services/authService"
import { userApi } from "../services/userService"

export const store = configureStore({
    reducer: {
        reports: reportsReducer,
        assets: assetsReducer,
        auth: authReducer,
        theme: themeReducer,
        [firebaseApi.reducerPath]: firebaseApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firebaseApi.middleware, authApi.middleware, userApi.middleware)
})