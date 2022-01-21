import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoNewsApiHeaders = {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
};

const cryptoNewsParams = {
    freshness: "Day",
    textFormat: "Raw",
    safeSearch: "Off",
};
const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({
    url,
    params: cryptoNewsParams,
    headers: cryptoNewsApiHeaders,
});
export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ newsCategory, count }) =>
                createRequest(`/news/search?q=${newsCategory}&count=${count}`),
        }),
    }),
});

export const { useGetNewsQuery } = cryptoNewsApi;
