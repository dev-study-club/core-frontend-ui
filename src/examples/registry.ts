import JihyeonChapter01Example from "@/examples/ch01/jihyeon/Example";
import ChangjunChapter01Example from "@/examples/ch01/changjun/Example";
import YejiChapter01Example from "@/examples/ch01/yeji/Example";
import JihyeonChapter02Example from "@/examples/ch02/jihyeon/Example";
import JihyeonChapter03Example from "@/examples/ch03/jihyeon/Example";
import JihyeonChapter04Example from "@/examples/ch04/jihyeon/Example";
import ChangjunChapter02Example from "@/examples/ch02/changjun/Example";
import type { ChapterId, ExampleEntry, MemberId } from "@/types/study";

export const exampleEntries: ExampleEntry[] = [
	{
    chapterId: "ch01",
    memberId: "jihyeon",
    title: "Chapter 01 아코디언",
    description: "리액트/바닐라로 구현한 아코디언 예제 모음입니다.",
    Component: JihyeonChapter01Example,
  },
	{
		chapterId: "ch01",
		memberId: "yeji",
		title: "Chapter 01 예제",
		description: "예제 코드를 추가하는 위치를 보여주는 기본 샘플입니다.",
		Component: YejiChapter01Example,
	},
  {
    chapterId: "ch02",
    memberId: "jihyeon",
    title: "Chapter 02 탭 메뉴",
    description: "리액트/바닐라로 구현한 아코디언 예제 모음입니다.",
    Component: JihyeonChapter02Example,
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
    chapterId: "ch03",
    memberId: "jihyeon",
    title: "Chapter 03 툴팁",
    description: "리액트/바닐라로 구현한 아코디언 예제 모음입니다.",
    Component: JihyeonChapter03Example,
  },
  {
    chapterId: "ch04",
    memberId: "jihyeon",
    title: "Chapter 04 반응형 텍스트박스",
    description:
      "리액트/바닐라로 구현한 아코디언 예제 모음입니다.",
    Component: JihyeonChapter04Example,
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
