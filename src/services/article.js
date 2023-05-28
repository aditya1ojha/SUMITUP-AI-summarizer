//It is one specific part of a state of our global store

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=2`,

            // The articleUrl that we've passed might some time contain some special characters which may cause some problems or errors in our app. So whenever we're passing something in the URL, we're wrapping it inside encodeURIComponent function.
            // So whenever you pass user-generated content into the URL, be sure to wrap it within this function
        })
    })
});

export const { useLazyGetSummaryQuery } = articleApi;
//we don't wanna call it immediately, we wanna call it after entering the URL and clicking on the submit button; thus we've used Lazy
//Lazy allows us to fire the hook on-demand; we don't have to fire it as soon as the app loads