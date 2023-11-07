import baseApi from "../baseApi";

const moneyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMoney: builder.query({
      query: (email) => `/my-money?email=${email}`,
    }),
  }),
});

export const { useGetMoneyQuery } = moneyApi;
