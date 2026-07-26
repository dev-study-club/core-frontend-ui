import YejiChapter01Example from "@/examples/ch01/yeji/Example";
import JuhyeChapter01 from "@/examples/ch01/juhye/ch1";

import type { ChapterId, ExampleEntry, MemberId } from "@/types/study";
import JuhyeChapter02 from "@/examples/ch02/juhye/ch2";

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
    memberId: "juhye",
    title: "Chapter 01 예제",
    description: "예제 코드를 추가하는 위치를 보여주는 기본 샘플입니다.",
    Component: JuhyeChapter01,
  },

  {
    chapterId: "ch02",
    memberId: "juhye",
    title: "Chapter 02 예제",
    description: "예제 코드를 추가하는 위치를 보여주는 기본 샘플입니다.",
    Component: JuhyeChapter02,
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
