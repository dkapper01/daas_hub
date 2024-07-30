import { createFileRoute, Outlet } from "@tanstack/react-router";
// import { fetchCompany } from "../utils/companies";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import { fetchCompany } from "../api/companies";

// useSuspenseQuery
// import { useSuspenseQuery } from "@tanstack/react-query";

// const companiesQueryOptions = {
//   queryKey: ["companies1"],
//   queryFn: () => [
//     { id: 12, name: "company1" },
//     { id: 14, name: "company2" },
//   ],
// };

// async function fetchCompany(id: string) {
//   console.log("fetchCompany", id);

//   const response = await axios.get(`/api/companies/${id}`);

//   console.log("fetchCompany response", response);
//   return response.data;
// }

// const companyQueryOptions = (id: string) =>
//   useQuery({
//     queryKey: ["companyId", { id }],
//     queryFn: () => fetchCompany(id),
//   });

export const Route = createFileRoute("/companies/$id")({
  loader: async ({ params: { id }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ["company6", id],
      queryFn: () => fetchCompany(id),
    });
  },
  component: () => (
    <div>
      {/* <Outlet /> */}
      Hello /dashboard/companies/$id!
    </div>
  ),
});
// export const Route = createFileRoute("/companies/$id")({
//   loader: ({ context: { queryClient }, params: { postId } }) => {
//     return queryClient.ensureQueryData(postQueryOptions(postId));
//   },
//   errorComponent: PostErrorComponent,
//   component: PostComponent,
// });
