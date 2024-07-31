import { createFileRoute } from "@tanstack/react-router";
import { fetchCompany } from "../api/companies";

export const Route = createFileRoute("/companies/$id")({
  loader: async ({ params: { id }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ["company6", id],
      queryFn: () => fetchCompany(id),
    });
  },

  component: () => {
    const { name } = Route.useLoaderData();

    return <div>{name}</div>;
  },
});
