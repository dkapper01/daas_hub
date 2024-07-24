import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/")({
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
    <div className="p-5 flex">
      <div>
        <h3 className="">All companies</h3>
        <ul>
          {data &&
            data.map((company: Company) => (
              <li key={company.id}>{company.name}</li>
            ))}
        </ul>
      </div>
      <div>
        {/* <input
          type="text"
          placeholder="Company name"
          className="ring-1 ring-inset ring-gray-300 rounded p-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <button
          className="bg-blue-500 text-white font-bold py-1 px-1 rounded"
          onClick={() => addCompanyMutation.mutate({ name })}
        >
          Create a company
        </button>
      </div>
    </div>
  );
}

export default Index;
