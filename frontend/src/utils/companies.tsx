import axios from "axios";

// fetch all companies
export async function fetchCompanies() {
  //   const response = await axios.get("/api/companies");
  //   return response.data;
}

// fetch a single company
export async function fetchCompany(id: string) {
  console.log("fetchCompany", id);

  const response = await axios.get(`/api/companies/${id}`);

  console.log("fetchCompany response", response);
  return response.data;
}
