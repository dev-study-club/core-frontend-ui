import ChangjunChapter01Example from "@/examples/ch01/changjun/Example";
import YejiChapter01Example from "@/examples/ch01/yeji/Example";
import ChangjunChapter02Example from "@/examples/ch02/changjun/Example";
import JuntaeChapter01Example from "@/examples/ch01/juntae/Example";
import JuntaeChapter02Example from "@/examples/ch02/juntae/Example";
import type { ChapterId, ExampleEntry, MemberId } from "@/types/study";

export const exampleEntries: ExampleEntry[] = [
  {
    chapterId: "ch01",
    memberId: "yeji",
    title: "Chapter 01 예제",
    description: "예제 코드를 추가하는 위치를 보여주는 기본 샘플입니다.",
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
    memberId: "changjun",
    title: "탭 메뉴",
    description: "리액트/바닐라로 구현한 탭 메뉴 예제 모음입니다.",
    Component: ChangjunChapter02Example,
  },
  {
    chapterId: "ch01",
    memberId: "juntae",
    title: "아코디언",
    description: "리액트/바닐라로 구현한 아코디언 예제 모음입니다.",
    Component: JuntaeChapter01Example,
  },
  {
    chapterId: "ch02",
    memberId: "juntae",
    title: "탭 메뉴",
    description: "리액트/바닐라로 구현한 탭 메뉴 예제 모음입니다.",
    Component: JuntaeChapter02Example,
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
