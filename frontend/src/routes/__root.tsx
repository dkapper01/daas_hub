// import * as React from "react";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetchCompanies } from "../api/companies";

const NotFoundComponent = () => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-3xl">Page Not Found</h1>
    <Link to="/" className="text-blue-700">
      Go back to Home
    </Link>
  </div>
);

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
  }
);

function RootComponent() {
  const { data, error, isLoading } = useQuery<{ id: number; name: string }[]>({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading companies.</div>;
  }

  const dataArray = data?.map((company) => {
    const { id, name } = company;
    return [id, name];
  });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex items-center justify-between border-b gap-2">
          <h1 className="text-3xl p-2">
            <Link to="/">All Companies</Link>
          </h1>
          <Link to="/create" className="text-blue-700">
            New Company
          </Link>
        </div>

        <div className="flex-1 flex">
          <div className="divide-y w-56">
            {dataArray?.map(([id, name]) => (
              <div key={id}>
                <Link
                  to={`/companies/${id}`}
                  className="block py-2 px-3 text-blue-700"
                >
                  {name}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex-1 border-l">
            <Outlet />
          </div>
        </div>
      </div>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
