import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/companies/")({
  component: () => (
    <div>
      Hello /companies/!
      {/* <Outlet /> */}
    </div>
  ),
});
