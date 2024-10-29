import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Updated import
import { UserPayloadType, UserType } from "../../../types/ApiSliceTypes";

const BaseUrl = `http://localhost:3000/`; // Change depende on port number

const userApi = createApi({
  reducerPath: "test-api", // optional key (reducerPath)
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
  }),
  endpoints: (builder) => ({
    //  GET METHOD
    getUsers: builder.query<UserPayloadType[], string>({
      query: (endpoints) => `/${endpoints}`,
    }),

    // POST METHOD
    addUser: builder.mutation<void, UserPayloadType>({
      query: (payload) => ({
        url: `/user`,
        method: "POST",
        body: payload,
      }),
    }),

    // DELETE
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      })
    }),

  }),
});

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } = userApi;
export default userApi;
