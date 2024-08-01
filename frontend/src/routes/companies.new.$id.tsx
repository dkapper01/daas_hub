import { createFileRoute, useParams } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/companies/new/$id")({
  component: CompaniesNewId,
});

function CompaniesNewId() {
  const { id } = useParams({ strict: false });

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const addRowMutation = useMutation({
    mutationFn: async (newRow: { name: string; url: string }) => {
      await axios.post(`http://localhost:3000/companies/${id}/rows`, newRow);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addRowMutation.mutateAsync({ name, url });
    } catch (error) {
      console.error("Error adding row to company", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add a New Row to Company</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Row Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Row URL:
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Row to Company
        </button>
      </form>
      {addRowMutation.isError && (
        <p className="mt-4 text-red-500">Error adding row</p>
      )}
      {addRowMutation.isSuccess && (
        <p className="mt-4 text-green-500">Row added successfully!</p>
      )}
    </div>
  );
}

export default CompaniesNewId;
