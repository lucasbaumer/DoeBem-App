import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line import/no-unresolved
// import { API_URL } from "@env";
const API_URL = "http://172.20.10.4:5129";

import { RootState } from ".";

import {
  DefaultResponse,
  SignInResponse,
  SignInRequest,
  SignUpRequest,
  AccountDetailsResponse,
  AccountDetailsRequest,
  HospitalDetailsResponse,
  HospitalListResponse,
  DonateRequest,
  MyDonationsResponse,
} from "@/@types";
import { DonateListResponse } from "@/@types/queries/DonateListResponse";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, object, FetchBaseQueryMeta>,
  tagTypes: ["User", "Donation", "Shipment"],
  endpoints: (builder) => ({
    // Auth
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: "/api/Login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    accountDetails: builder.query<AccountDetailsResponse, void>({
      query: () => ({
        url: "/api/User/Profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    signUpDonor: builder.mutation<DefaultResponse, SignUpRequest>({
      query: (body) => ({
        url: "/api/Register/Donor",
        method: "POST",
        body,
      }),
    }),
    signUpAdm: builder.mutation<DefaultResponse, SignUpRequest>({
      query: (body) => ({
        url: "/api/Register/Admin",
        method: "POST",
        body,
      }),
    }),
    hospitalList: builder.query<HospitalListResponse, void>({
      query: () => ({
        url: "/api/Hospital",
        method: "GET",
      }),
    }),
    hospitalDetails: builder.query<HospitalDetailsResponse, string>({
      query: (id) => ({
        url: `/api/Hospital/${id}`,
        method: "GET",
      }),
    }),
    donation: builder.mutation<DefaultResponse, DonateRequest>({
      query: (body) => ({
        url: "/api/Donation",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Donation"],
    }),
    donationList: builder.query<DefaultResponse, DonateListResponse>({
      query: (body) => ({
        url: "/api/Donation",
        method: "GET",
        body,
      }),
      providesTags: ["Donation"],
    }),
    hospitalDonations: builder.query<DefaultResponse, string>({
      query: (id) => ({
        url: `/api/Donation/Hospital/${id}`,
        method: "GET",
      }),
      providesTags: ["Donation"],
    }),
    // My Donations
    myDonations: builder.query<MyDonationsResponse, string>({
      query: (id) => ({
        url: `/WithDonations/${id}`,
        method: "GET",
      }),
      providesTags: ["Donation"],
    }),
  }),
});

export const {
  // ** Auth
  useSignInMutation,
  useSignUpDonorMutation,
  useSignUpAdmMutation,
  // ** Account
  useAccountDetailsQuery,
  useLazyAccountDetailsQuery,
  // ** Hospital
  useHospitalListQuery,
  useHospitalDetailsQuery,
  // ** Donation
  useDonationMutation,
  useMyDonationsQuery,
  useDonationListQuery,
  useHospitalDonationsQuery,
} = api;
