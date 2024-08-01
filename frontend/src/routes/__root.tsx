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
import axios from "axios";
import { Bell, Database } from "lucide-react";

import { Button } from "@/components/ui/button";

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
    queryKey: ["companiesrt"],
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
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <span className="">Acme Inc</span>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  {dataArray?.map(([id, name]) => (
                    <Link
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      to={`/companies/${id}`}
                    >
                      <Database className="h-4 w-4" />
                      {name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="flex-1 border-l">
            <Button onClick={() => {}}>test</Button>
            <Outlet />
          </div>
        </div>
      </div>

      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
