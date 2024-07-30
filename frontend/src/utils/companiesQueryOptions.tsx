import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchCompanies, fetchCompany } from "./companies";
import axios from "axios";

// export const companiesQueryOptions = queryOptions({
//   queryKey: ["companies1"],
//   queryFn: () => [
//     { id: 12, name: "company1" },
//     { id: 14, name: "company2" },
//   ],
// });
export const companyQueryOptions = (id: string) =>
  useQuery({
    queryKey: ["companyId", { id }],
    queryFn: () => fetchCompany(id),
  });
