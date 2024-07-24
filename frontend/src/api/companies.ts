import axios from "axios";

export const fetchCompanies = async () => {
  const response = await axios.get("http://localhost:3000/companies");
  return response.data;
};
