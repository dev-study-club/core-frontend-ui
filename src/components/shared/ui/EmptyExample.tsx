import { FileCode2 } from "lucide-react";

interface EmptyExampleProps {
  chapterTitle: string;
  memberName: string;
}

export function EmptyExample({ chapterTitle, memberName }: EmptyExampleProps) {
  return (
    <section className="empty-example" aria-labelledby="empty-example-title">
      <FileCode2 aria-hidden="true" size={36} />
      <h2 id="empty-example-title">아직 등록된 예제가 없습니다</h2>
      <p>
        {chapterTitle}의 {memberName} 예제를 추가한 뒤
        `src/examples/registry.ts`에 등록하세요.
      </p>
    </section>
  );
}

