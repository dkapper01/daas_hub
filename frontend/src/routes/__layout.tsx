import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <div>Layouting</div>
      <hr />
      <Outlet />
    </div>
  );
}
