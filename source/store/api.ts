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
  }) as BaseQueryFn<string | FetchArgs, unknown, ErrorResponse, object, FetchBaseQueryMeta>,
  tagTypes: ["User", "Service", "Shipment"],
  endpoints: (builder) => ({
    // Auth
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: "/Donor/login",
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
        url: "/Donor",
        method: "POST",
        body,
      }),
    }),
    // ** Account
    accountDetails: builder.query<AccountDetailsResponse, void>({
      query: () => ({
        url: "/Donor",
        method: "GET",
      }),
    }),
    
    // ** Contents
    getContentsBySlug: builder.query<ContentResponse, string>({
      query: (slug) => ({
        url: `/contents/${slug}`,
        method: "GET",
      }),
    }),
    // ** Notifications
    getNotifications: builder.query<NotificationResponse, void>({
      query: () => ({
        url: "/delivery/notifications",
        method: "GET",
      }),
    }),
    setNotificationRead: builder.mutation<DefaultResponse, number>({
      query: (id) => ({
        url: `/delivery/notifications/${id}/read`,
        method: "PATCH",
      }),
    }),
    // ** Order Shipments
    getOrderShipmentDetails: builder.query<OrderShipmentDetailsResponse, number>({
      query: (id) => ({
        url: `/delivery/order-shipments/${id}`,
        method: "GET",
      }),
      providesTags: ["Shipment"],
    }),
    // ** Shipments
    getListShipments: builder.query<ListShipmentsResponse, void>({
      query: () => ({
        url: "/delivery/shipments",
        method: "GET",
      }),
      providesTags: ["Shipment"],
      keepUnusedDataFor: 0,
    }),
    getLastShipmentInProgress: builder.query<LastShipmentInProgressResponse, void>({
      query: () => ({
        url: "/delivery/shipments/last-shipment-in-progress",
        method: "GET",
      }),
      providesTags: ["Shipment"],
      keepUnusedDataFor: 0,
    }),
    getShipmentDetails: builder.query<ShipmentDetailsResponse, number>({
      query: (id) => ({
        url: `/delivery/shipments/${id}`,
        method: "GET",
      }),
      providesTags: ["Shipment"],
      keepUnusedDataFor: 0,
    }),
    bindShipment: builder.mutation<void, number>({
      query: (id) => ({
        url: `/delivery/shipments/${id}/bind`,
        method: "POST",
      }),
      invalidatesTags: (_, error) => {
        if (error?.status === 400) return [];

        return ["Shipment"];
      },
    }),
    bindOrderShipment: builder.mutation<void, number>({
      query: (id) => ({
        url: `/delivery/shipments/${id}/bind-order`,
        method: "POST",
      }),
      invalidatesTags: (_, error) => {
        if (error?.status === 400) return [];

        return ["Shipment"];
      },
    }),
    updateShipment: builder.mutation<DefaultResponse, UpdateShipmentRequest>({
      query: (data) => ({
        url: `/delivery/shipments/${data.id}/update?_method=PUT`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: (_, error) => {
        if (error?.status === 400) return [];

        return ["Shipment"];
      },
    }),
    // ** Firebase Token
    updateFirebaseToken: builder.mutation<void, UpdateFirebaseTokenRequest>({
      query: (body) => ({
        url: "/delivery/account/me/firebase-token",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  // ** Auth
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
  useSocialLoginMutation,
  useForgotPasswordChangePasswordMutation,
  useForgotPasswordSendCodeMutation,
  useForgotPasswordValidateCodeMutation,
  // ** Account
  useAccountDetailsQuery,
  useLazyAccountDetailsQuery,
  useSetAccountDetailsMutation,
  // ** Contents
  useGetContentsBySlugQuery,
  // ** Notifications
  useGetNotificationsQuery,
  useSetNotificationReadMutation,
  // ** Order Shipments
  useGetOrderShipmentDetailsQuery,
  useLazyGetOrderShipmentDetailsQuery,
  // ** Shipments
  useUpdateShipmentMutation,
  useGetLastShipmentInProgressQuery,
  useGetListShipmentsQuery,
  useGetShipmentDetailsQuery,
  useLazyGetShipmentDetailsQuery,
  useBindShipmentMutation,
  useBindOrderShipmentMutation,
  // ** Firebase Token
  useUpdateFirebaseTokenMutation,
} = api;
