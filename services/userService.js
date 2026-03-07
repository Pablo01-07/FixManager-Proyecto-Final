import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FIREBASE_DB_URL } from "../firebase/database.js"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: FIREBASE_DB_URL
    }),

    endpoints: (builder) => ({
        saveProfilePicture: builder.mutation({
            query: ({ localId, image }) => ({
                url: `profilePictures/${localId}.json`,
                method: "PUT",
                body: {
                    image
                }
            })
        }),

        getProfilePicture: builder.query({
            query: (localId) =>
                `profilePictures/${localId}.json`
        })
    })
})

export const { useSaveProfilePictureMutation, useGetProfilePictureQuery } = userApi