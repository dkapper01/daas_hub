import {
  Link,
  Outlet,
  createFileRoute,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/companies")({
  component: CompaniesComponent,
});

function CompaniesComponent() {
  const { id } = useParams({ strict: false });

  return (
    <>
      <div className="flex flex-wrap divide-x">
        {(
          [
            [`/companies/${id}`, "Data", true],
            [`/companies/new/${id}`, "New"],
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
