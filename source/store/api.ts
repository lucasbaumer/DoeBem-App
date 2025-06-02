import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

import { RootState } from ".";

import {
  DefaultResponse,
  SignInResponse,
  SignInRequest,
  SignUpRequest,
} from "@/@types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as RootState)?.auth.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, object, FetchBaseQueryMeta>,
  tagTypes: ["User", "Service", "Shipment"],
  endpoints: (builder) => ({
    // Auth
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    signOut: builder.mutation<DefaultResponse, void>({
      query: () => ({
        url: "/Donor/logout",
        method: "POST",
      }),
    }),
    signUp: builder.mutation<DefaultResponse, SignUpRequest>({
      query: (body) => ({
        url: "/cadastrar",
        method: "POST",
        body,
      }),
    }),
    // ** Account
    // accountDetails: builder.query<AccountDetailsResponse, void>({
    //   query: () => ({
    //     url: "/Donor",
    //     method: "GET",
    //   }),
    // }),
    
    // ** Contents
    // getContentsBySlug: builder.query<ContentResponse, string>({
    // query: (slug) => ({
    //   url: `/contents/${slug}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  // ** Auth
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
  // ** Account
  // useAccountDetailsQuery,
  // useSetAccountDetailsMutation,
} = api;
