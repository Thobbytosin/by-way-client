import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get layout (by type)
    getHeroData: builder.query({
      query: (type) => ({
        url: `/get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // edit layout
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: "/edit-layout",
        method: "PUT",
        body: { type, image, title, subTitle, faq, categories },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("LAYOUT EDITED SUCCESSFULLY");
        } catch (error: any) {
          // console.log("ERROR EDITING LAYOUT:", error);
        }
      },
    }),
  }),
});

export const { useGetHeroDataQuery, useEditLayoutMutation } = layoutApi;
