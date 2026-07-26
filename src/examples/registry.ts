import YejiChapter01Example from "@/examples/ch01/yeji/Example";
import type { ChapterId, ExampleEntry, MemberId } from "@/types/study";

export const exampleEntries: ExampleEntry[] = [
  {
    chapterId: "ch01",
    memberId: "yeji",
    title: "Chapter 01 예제",
    description: "예제 코드를 추가하는 위치를 보여주는 기본 샘플입니다.",
    Component: YejiChapter01Example,
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

