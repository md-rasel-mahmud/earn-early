import baseApi from "../baseApi";

const userApi = baseApi.injectEndpoints({
  // post user

  endpoints: (builder) => ({
    postUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),
    getAccessToken: builder.mutation({
      query: (data) => ({
        url: "/jwt",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostUserMutation, useGetAccessTokenMutation } = userApi;
export default userApi;
