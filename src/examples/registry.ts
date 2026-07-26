import YejiChapter01Example from "@/examples/ch01/yeji/Example";
import YejiChapter02Example from "@/examples/ch02/yeji/Example";
import YejiChapter03Example from "@/examples/ch03/yeji/Example";
import type { ChapterId, ExampleEntry, MemberId } from "@/types/study";

export const exampleEntries: ExampleEntry[] = [
  {
    chapterId: "ch01",
    memberId: "yeji",
    title: "Chapter 01 Accordion",
    description: "아코디언 UI 예제입니다.",
    Component: YejiChapter01Example,
  },
  {
    chapterId: "ch02",
    memberId: "yeji",
    title: "Chapter 02 Tab Menu",
    description: "탭 메뉴 UI 예제입니다.",
    Component: YejiChapter02Example,
  },
  {
    chapterId: "ch03",
    memberId: "yeji",
    title: "Chapter 03 Tooltip",
    description: "툴팁 UI 예제입니다.",
    Component: YejiChapter03Example,
  },
];

export function findExample(
  chapterId: ChapterId,
  memberId: MemberId,
): ExampleEntry | undefined {
  return exampleEntries.find(
    (entry) => entry.chapterId === chapterId && entry.memberId === memberId,
  );
}
