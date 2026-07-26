import type { ComponentType } from "react";
import { findExample } from "@/examples/registry";
import { ChapterExamplePage } from "@/pages/ChapterExamplePage";
import { HomePage } from "@/pages/HomePage";
import { chapters, members } from "@/studyData";
import type { ChapterId, MemberId } from "@/types/study";

export type RoutePath = string;

export interface RouteComponentProps {
  chapterId?: ChapterId;
  memberId?: MemberId;
}

type BaseRoute = {
  name: string;
  path: string;
  to?: "/" | "/$chapterId/$memberId";
  params?: {
    chapterId: ChapterId;
    memberId: MemberId;
  };
};

export type ParentRoute = BaseRoute & {
  children: RoutePath[];
};

export type ChildRoute = BaseRoute & {
  Component: ComponentType<RouteComponentProps> | null;
};

export type Route = ParentRoute | ChildRoute;

function createRouteMap() {
  const routeMap: Record<RoutePath, Route> = {
    root: {
      name: "root",
      path: "/",
      children: ["home", ...chapters.map((chapter) => chapter.id)],
    },
    home: {
      name: "홈",
      path: "/",
      to: "/",
      Component: HomePage,
    },
  };

  chapters.forEach((chapter) => {
    routeMap[chapter.id] = {
      name: chapter.title,
      path: `/${chapter.id}`,
      children: members.map((member) => `${chapter.id}-${member.id}`),
    };

    members.forEach((member) => {
      const example = findExample(chapter.id, member.id);

      routeMap[`${chapter.id}-${member.id}`] = {
        name: member.name,
        path: `/${chapter.id}/${member.id}`,
        to: "/$chapterId/$memberId",
        params: {
          chapterId: chapter.id,
          memberId: member.id,
        },
        Component: example ? ChapterExamplePage : null,
      };
    });
  });

  return routeMap;
}

export const routeMap = createRouteMap();

export const isParentRoute = (route: Route): route is ParentRoute =>
  "children" in route;

export const isChildRoute = (route: Route): route is ChildRoute =>
  "Component" in route;

export const gnbRootList: [RoutePath, Route][] = (
  routeMap.root as ParentRoute
).children.map((routePath) => [routePath, routeMap[routePath]]);
