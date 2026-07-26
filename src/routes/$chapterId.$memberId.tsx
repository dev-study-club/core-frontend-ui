import { createFileRoute } from "@tanstack/react-router";
import { routeMap, isChildRoute } from "@/routeMap";
import type { ChapterId, MemberId } from "@/types/study";

export const Route = createFileRoute("/$chapterId/$memberId")({
  component: ChapterExampleRoute,
});

function ChapterExampleRoute() {
  const { chapterId, memberId } = Route.useParams() as {
    chapterId: ChapterId;
    memberId: MemberId;
  };
  const route = routeMap[`${chapterId}-${memberId}`];

  if (!route || !isChildRoute(route) || !route.Component) {
    return null;
  }

  return <route.Component chapterId={chapterId} memberId={memberId} />;
}
