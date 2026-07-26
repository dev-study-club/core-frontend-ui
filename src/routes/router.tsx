import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { AppLayout } from "@/components/shared/layout/AppLayout";
import { ChapterExamplePage } from "@/pages/ChapterExamplePage";
import { HomePage } from "@/pages/HomePage";
import type { ChapterId, MemberId } from "@/types/study";

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const chapterExampleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$chapterId/$memberId",
  component: ChapterExamplePage,
  validateSearch: (search) => search,
});

const routeTree = rootRoute.addChildren([indexRoute, chapterExampleRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export interface ChapterExampleParams {
  chapterId: ChapterId;
  memberId: MemberId;
}

