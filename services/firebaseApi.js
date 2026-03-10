import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FIREBASE_DB_URL } from "../firebase/database.js"

export const firebaseApi = createApi({
    reducerPath: "firebaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: FIREBASE_DB_URL
    }),
    tagTypes: ["Assets", "Reports"],

    endpoints: (builder) => ({
        addAsset: builder.mutation({
            query: (newAsset) => ({
                url: "assets.json",
                method: "POST",
                body: newAsset
            }),
            invalidatesTags: ["Assets"]
        }),

        getAssets: builder.query({
            query: () => "assets.json",
            transformResponse: (response) =>
                response
                    ? Object.entries(response).map(([key, value]) => ({
                        firebaseKey: key,
                        ...value
                    }))
                    : [],
            providesTags: ["Assets"]
        }),

        deleteAsset: builder.mutation({
            query: (firebaseKey) => ({
                url: `assets/${firebaseKey}.json`,
                method: "DELETE"
            }),
            invalidatesTags: ["Assets"]
        }),

        addReport: builder.mutation({
            query: ({ userId, newReport }) => ({
                url: `reports/${userId}.json`,
                method: "POST",
                body: newReport
            }),
            invalidatesTags: ["Reports"]
        }),

        updateReport: builder.mutation({
            query: ({ userId, firebaseKey, updatedData }) => ({
                url: `reports/${userId}/${firebaseKey}.json`,
                method: "PATCH",
                body: updatedData
            }),
            invalidatesTags: ["Reports"]
        }),

        getReports: builder.query({
            query: (userId) => `reports/${userId}.json`,
            transformResponse: (response) =>
                response
                    ? Object.entries(response).map(([key, value]) => ({
                        firebaseKey: key,
                        ...value
                    }))
                    : [],
            providesTags: ["Reports"]
        }),

        deleteReport: builder.mutation({
            query: ({ userId, firebaseKey }) => ({
                url: `reports/${userId}/${firebaseKey}.json`,
                method: "DELETE"
            }),
            invalidatesTags: ["Reports"]
        }),

        getCategories: builder.query({
            query: () => "categories.json",
            transformResponse: (response) =>
                Array.isArray(response)
                    ? response
                    : response
                        ? Object.values(response)
                        : []
        })
    })
})

export const {
    useGetAssetsQuery,
    useGetReportsQuery,
    useGetCategoriesQuery,
    useAddAssetMutation,
    useAddReportMutation,
    useUpdateReportMutation,
    useDeleteReportMutation,
    useDeleteAssetMutation
} = firebaseApi