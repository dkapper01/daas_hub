import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/companies")({
  //   loader: ({ context: { queryClient } }) => {
  //     console.log("companies route loader", queryClient);
  //   },
  component: CompaniesComponent,
});

function CompaniesComponent() {
  return (
    <>
      companies component
      <Outlet />
    </>
  );
}
