import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Link, Outlet } from "@tanstack/react-router";
// import { useQv }
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Index,
});

interface Company {
  id: number;
  name: string;
}

function Index() {
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all companies
  const { data, error, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: () =>
      fetch("http://localhost:3000/companies").then((res) => res.json()),
  });

  // Define the mutation function
  const createCompany = async (newCompany: { name: string }) => {
    const res = await fetch("http://localhost:3000/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCompany),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  };

  // add a new company mutation
  const addCompanyMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      navigate({ to: `/${encodeURIComponent(name)}` });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading companies</div>;

  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="text-xl p-2">Dashboard</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ["", "Home", true],
            ["/customers", "Customers"],
            ["/users", "Users"],
          ] as const
        ).map(([to, label, exact]) => {
          return (
            <Link
              key={to}
              to={`/${to}`}
              activeOptions={{ exact }}
              activeProps={{ className: `font-bold` }}
              className="p-2"
            >
              {label}
            </Link>
          );
        })}
      </div>
      <hr />
      <Outlet />
    </>
  );
}

export default Index;
