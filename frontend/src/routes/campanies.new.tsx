import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/campanies/new")({
  component: () => (
    <div>
      Hello /campanies/$id/new!
      <Outlet />
    </div>
  ),
});
