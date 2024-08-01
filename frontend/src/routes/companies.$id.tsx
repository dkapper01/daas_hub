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
    const { name, rows } = Route.useLoaderData();
    return (
      <>
        <h1>{name}</h1>
        <ul>
          {rows.map((row: { id: number; name: string; url: string }) => (
            <li key={row.id}>
              {row.name} - {row.url}
            </li>
          ))}
        </ul>
      </>
    );
  },
});
