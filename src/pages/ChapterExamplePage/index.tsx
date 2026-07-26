import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EmptyExample } from "@/components/shared/ui/EmptyExample";
import { findExample } from "@/examples/registry";
import { chapters, members } from "@/studyData";
import type { ChapterId, MemberId } from "@/types/study";

interface ChapterExamplePageProps {
  chapterId?: ChapterId;
  memberId?: MemberId;
}

export function ChapterExamplePage({
  chapterId,
  memberId,
}: ChapterExamplePageProps) {
  if (!chapterId || !memberId) {
    return (
      <section className="page-state" aria-labelledby="not-found-title">
        <h1 id="not-found-title">예제를 찾을 수 없습니다</h1>
        <Link to="/" className="text-link">
          홈으로 돌아가기
        </Link>
      </section>
    );
  }

  const chapter = chapters.find((item) => item.id === chapterId);
  const member = members.find((item) => item.id === memberId);

  if (!chapter || !member) {
    return (
      <section className="page-state" aria-labelledby="not-found-title">
        <h1 id="not-found-title">예제를 찾을 수 없습니다</h1>
        <Link to="/" className="text-link">
          홈으로 돌아가기
        </Link>
      </section>
    );
  }

  const example = findExample(chapter.id, member.id);
  const ExampleComponent = example?.Component;

  return (
    <section className="example-page" aria-labelledby="example-page-title">
      <Link to="/" className="back-link">
        <ChevronLeft aria-hidden="true" size={18} />
        전체 예제
      </Link>

      <div className="page-heading">
        <p className="eyebrow">{member.name}</p>
        <h1 id="example-page-title">{chapter.title}</h1>
        <p>{example?.description ?? "이 위치에 개인별 예제가 표시됩니다."}</p>
      </div>

      <div className="example-surface">
        {ExampleComponent ? (
          <ExampleComponent />
        ) : (
          <EmptyExample chapterTitle={chapter.title} memberName={member.name} />
        )}
      </div>
    </section>
  );
}
