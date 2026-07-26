import ChangjunChapter01Example from "@/examples/ch01/changjun/Example";
import YejiChapter01Example from "@/examples/ch01/yeji/Example";
import ChangjunChapter02Example from "@/examples/ch02/changjun/Example";
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
    chapterId: "ch01",
    memberId: "changjun",
    title: "아코디언",
    description: "리액트/바닐라로 구현한 아코디언 예제 모음입니다.",
    Component: ChangjunChapter01Example,
  },
  {
    chapterId: "ch02",
    memberId: "yeji",
    title: "Chapter 02 Tab Menu",
    description: "탭 메뉴 UI 예제입니다.",
    Component: YejiChapter02Example,
  },
  {
    chapterId: "ch02",
    memberId: "changjun",
    title: "탭 메뉴",
    description: "리액트/바닐라로 구현한 탭 메뉴 예제 모음입니다.",
    Component: ChangjunChapter02Example,
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
