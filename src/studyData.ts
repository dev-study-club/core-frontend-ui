import type { Chapter, StudyMember } from "@/types/study";

export const chapters: Chapter[] = Array.from({ length: 17 }, (_, index) => {
  const chapterNumber = index + 1;
  const id = `ch${String(chapterNumber).padStart(2, "0")}` as Chapter["id"];

  return {
    id,
    title: `Chapter ${String(chapterNumber).padStart(2, "0")}`,
  };
});

export const members: StudyMember[] = [
  { id: "jihyeon", name: "지현" },
  { id: "yeji", name: "예지" },
  { id: "juhye", name: "주혜" },
  { id: "juntae", name: "준태" },
  { id: "changjun", name: "창준" },
];

