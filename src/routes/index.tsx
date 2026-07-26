import { createFileRoute } from "@tanstack/react-router";
import { routeMap, isChildRoute } from "@/routeMap";

export const Route = createFileRoute("/")({
  component: HomeRoute,
});

function HomeRoute() {
  const homeRoute = routeMap.home;

  if (!isChildRoute(homeRoute) || !homeRoute.Component) {
    return null;
  }

  return <homeRoute.Component />;
}
