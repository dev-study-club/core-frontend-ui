import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { chapters, members } from "@/studyData";
import { findExample } from "@/examples/registry";

export function HomePage() {
  return (
    <section className="home-page" aria-labelledby="home-title">
      <div className="page-heading">
        <p className="eyebrow">Study Examples</p>
        <h1 id="home-title">장별 UI 예제 러너</h1>
        <p>
          책의 장을 기준으로 예제를 모으고, 팀원별 구현을 브라우저에서 바로
          확인합니다.
        </p>
      </div>

      <div className="chapter-grid">
        {chapters.map((chapter) => (
          <article key={chapter.id} className="chapter-card">
            <h2>{chapter.title}</h2>
            <div className="member-link-list">
              {members.map((member) => {
                const example = findExample(chapter.id, member.id);

                return (
                  <Link
                    key={member.id}
                    to="/$chapterId/$memberId"
                    params={{ chapterId: chapter.id, memberId: member.id }}
                    className="member-link"
                  >
                    <span>
                      {member.name}
                      {example ? "" : " 준비중"}
                    </span>
                    <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

