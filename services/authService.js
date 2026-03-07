import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_AUTH_URL, API_KEY } from "../firebase/authconfig"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_AUTH_URL
    }),

    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (auth) => ({
                url: `accounts:signUp?key=${API_KEY}`,
                method: "POST",
                body: auth
            })
        }),

        login: builder.mutation({
            query: (auth) => ({
                url: `accounts:signInWithPassword?key=${API_KEY}`,
                method: "POST",
                body: auth
            })
        })
    })
})

export const { useLoginMutation, useSignUpMutation } = authApi