import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoApiHeaders = {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
};
const baseUrl = "https://coinranking1.p.rapidapi.com";
const params = { referenceCurrencyUuid: "yhjMzLPhuIDl" };

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) =>
                createRequest(
                    `/coin/${coinId}/history/?timePeriod=${timePeriod}&referenceCurrencyUuid=yhjMzLPhuIDl`
                ),
        }),
    }),
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;
// var options = {
//     method: "GET",
//     url: "https://coinranking1.p.rapidapi.com/exchanges",
//     params: {
//         referenceCurrencyUuid: "yhjMzLPhuIDl",
//         limit: "50",
//         offset: "0",
//         orderBy: "24hVolume",
//         orderDirection: "desc",
//     },
//     headers: {
//         "x-rapidapi-host": "coinranking1.p.rapidapi.com",
//         "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
//     },
// };
