import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line import/no-unresolved
// import { API_URL } from "@env";
const API_URL = "http://10.0.2.2:5129";

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
import { DonorsResponse } from "@/@types/queries/DonorsResponse";
import { HospitalRequest } from "@/@types/queries/HospitalRequest";

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
  tagTypes: ["User", "Donation", "Shipment", "hospital"],
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
      providesTags: ["hospital"]
    }),
    hospital: builder.mutation<DefaultResponse, HospitalRequest>({
      query: (body) => ({
        url: "/api/Hospital",
        method: "POST",
        body,
      }),
      invalidatesTags: ["hospital"]
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
    donors: builder.query<DonorsResponse, void>({
      query: (id) => ({
        url: `/api/Donor`,
        method: "GET",
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
  useAccountDetailsQuery,
  useLazyAccountDetailsQuery,
  // ** Hospital
  useHospitalListQuery,
  useHospitalDetailsQuery,
  useHospitalMutation,
  // ** Donation
  useDonationMutation,
  useMyDonationsQuery,
  useDonationListQuery,
  useHospitalDonationsQuery,
  // ** Users
  useDonorsQuery
} = api;
