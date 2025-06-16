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
    baseUrl: `http://10.0.2.2:5129/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, object, FetchBaseQueryMeta>,
  tagTypes: ["User", "Service", "Shipment"],
  endpoints: (builder) => ({
    // Auth
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: "/Login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    signUpDonor: builder.mutation<DefaultResponse, SignUpRequest>({
      query: (body) => ({
        url: "/Register/Donor",
        method: "POST",
        body,
      }),
    }),
    signUpAdm: builder.mutation<DefaultResponse, SignUpRequest>({
      query: (body) => ({
        url: "/Register/Admin",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  // ** Auth
  useSignInMutation,
  useSignUpDonorMutation,
  useSignUpAdmMutation,
  // ** Account
  // useAccountDetailsQuery,
  // useSetAccountDetailsMutation,
} = api;
