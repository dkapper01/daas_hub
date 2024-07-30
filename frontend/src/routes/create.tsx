import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/create")({
  component: CreateNewCompany,
});

function CreateNewCompany() {
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["companies1234"] });
      navigate({ to: `/${encodeURIComponent(name)}` });
    },
  });

  return (
    <div>
      <h1>Create a new company</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addCompanyMutation.mutate({ name });
        }}
      >
        <label>
          Company Name:
          <input
            type="text"
            name="name"
            className="border border-gray-400 p-1 ml-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button
          className="bg-blue-500 text-white font-bold py-1 px-1 rounded"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
