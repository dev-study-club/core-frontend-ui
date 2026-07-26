import { Link, useRouterState } from "@tanstack/react-router";
import classNames from "classnames";
import { gnbRootList, isParentRoute, isChildRoute, routeMap } from "@/routeMap";

export default function Gnb() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <aside>
      <h1>
        UI요소모음
        <sub>Vite</sub>
      </h1>
      <nav aria-label="장별 예제">
        <ul>
          {gnbRootList.map(([routePath, route]) => {
            if (routePath === "home" || !isParentRoute(route)) {
              return null;
            }

            const childRoutes = route.children.map((childPath) => [
              childPath,
              routeMap[childPath],
            ] as const);
            const isOpen = childRoutes.some(([, childRoute]) =>
              pathname.startsWith(childRoute.path),
            );

            return (
              <li
                key={routePath}
                className={classNames("parent", `items-${childRoutes.length}`, {
                  open: isOpen,
                })}
              >
                <Link to="/">{route.name}</Link>
                <ul className="subRoutes">
                  {childRoutes.map(([childPath, childRoute]) => {
                    const isActive = pathname === childRoute.path;

                    if (
                      !isChildRoute(childRoute) ||
                      !childRoute.Component ||
                      !childRoute.to ||
                      !childRoute.params
                    ) {
                      return (
                        <li key={childPath} className="disabled">
                          {childRoute.name}
                        </li>
                      );
                    }

                    return (
                      <li
                        key={childPath}
                        className={classNames({
                          active: isActive,
                        })}
                      >
                        <Link
                          to={childRoute.to}
                          params={childRoute.params}
                        >
                          {childRoute.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
