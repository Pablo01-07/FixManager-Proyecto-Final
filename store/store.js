import { configureStore } from "@reduxjs/toolkit"
import reportsReducer from "./slices/reportsSlice"
import assetsReducer from "./slices/assetsSlice"
import { firebaseApi } from "../services/firebaseApi";

export const store = configureStore({
    reducer: {
        reports: reportsReducer,
        assets: assetsReducer,
        [firebaseApi.reducerPath]: firebaseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firebaseApi.middleware)
})