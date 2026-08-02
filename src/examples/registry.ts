import ChangjunChapter01Example from "@/examples/ch01/changjun/Example";
import YejiChapter01Example from "@/examples/ch01/yeji/Example";
import ChangjunChapter02Example from "@/examples/ch02/changjun/Example";
import ChangjunChapter03Example from "@/examples/ch03/changjun/Example";
import ChangjunChapter04Example from "@/examples/ch04/changjun/Example";
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
		chapterId: "ch03",
		memberId: "changjun",
		title: "툴팁",
		description:
			"클릭 토글, 바깥 클릭 닫기, 화면 이탈 방지까지 단계별로 구현한 툴팁 예제 모음입니다.",
		Component: ChangjunChapter03Example,
	},
	{
		chapterId: "ch04",
		memberId: "changjun",
		title: "리액티브 텍스트박스",
		description:
			"내용에 맞춰 높이가 늘어나는 textarea를 canvas·replica·scrollHeight·field-sizing으로 비교한 예제 모음입니다.",
		Component: ChangjunChapter04Example,
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
