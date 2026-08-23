import ChangjunChapter01Example from "@/examples/ch01/changjun/Example";
import JihyeonChapter01Example from "@/examples/ch01/jihyeon/Example";
import JuhyeChapter01 from "@/examples/ch01/juhye/ch1";
import JuntaeChapter01Example from "@/examples/ch01/juntae/Example";
import YejiChapter01Example from "@/examples/ch01/yeji/Example";
import ChangjunChapter02Example from "@/examples/ch02/changjun/Example";
import JihyeonChapter02Example from "@/examples/ch02/jihyeon/Example";
import JuhyeChapter02 from "@/examples/ch02/juhye/ch2";
import JuntaeChapter02Example from "@/examples/ch02/juntae/Example";
import YejiChapter02Example from "@/examples/ch02/yeji/Example";
import ChangjunChapter03Example from "@/examples/ch03/changjun/Example";
import JihyeonChapter03Example from "@/examples/ch03/jihyeon/Example";
import YejiChapter03Example from "@/examples/ch03/yeji/Example";
import ChangjunChapter04Example from "@/examples/ch04/changjun/Example";
import JihyeonChapter04Example from "@/examples/ch04/jihyeon/Example";
import JihyeonChapter05Example from "@/examples/ch05/jihyeon/Example";
import JihyeonChapter06Example from "@/examples/ch06/jihyeon/Example";
import ChangjunChapter05Example from "@/examples/ch05/changjun/Example";
import ChangjunChapter06Example from "@/examples/ch06/changjun/Example";
import ChangjunChapter07Example from "@/examples/ch07/changjun/Example";
import ChangjunChapter08Example from "@/examples/ch08/changjun/Example";
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
    chapterId: "ch01",
    memberId: "juhye",
    title: "Chapter 01 예제",
    description: "예제 코드를 추가하는 위치를 보여주는 기본 샘플입니다.",
    Component: JuhyeChapter01,
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
    memberId: "jihyeon",
    title: "Chapter 02 탭 메뉴",
    description: "리액트/바닐라로 구현한 아코디언 예제 모음입니다.",
    Component: JihyeonChapter02Example,
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
    chapterId: "ch02",
    memberId: "juhye",
    title: "Chapter 02 예제",
    description: "예제 코드를 추가하는 위치를 보여주는 기본 샘플입니다.",
    Component: JuhyeChapter02,
  },
  {
    chapterId: "ch02",
    memberId: "juntae",
    title: "탭 메뉴",
    description: "리액트/바닐라로 구현한 탭 메뉴 예제 모음입니다.",
    Component: JuntaeChapter02Example,
  },
  {
    chapterId: "ch03",
    memberId: "jihyeon",
    title: "Chapter 03 툴팁",
    description: "리액트/바닐라로 구현한 아코디언 예제 모음입니다.",
    Component: JihyeonChapter03Example,
  },
  {
    chapterId: "ch03",
    memberId: "yeji",
    title: "Chapter 03 Tooltip",
    description: "툴팁 UI 예제입니다.",
    Component: YejiChapter03Example,
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
    memberId: "jihyeon",
    title: "Chapter 04 반응형 텍스트박스",
    description: "리액트/바닐라로 구현한 아코디언 예제 모음입니다.",
    Component: JihyeonChapter04Example,
  },
  {
    chapterId: "ch04",
    memberId: "changjun",
    title: "리액티브 텍스트박스",
    description:
      "내용에 맞춰 높이가 늘어나는 textarea를 canvas·replica·scrollHeight·field-sizing으로 비교한 예제 모음입니다.",
    Component: ChangjunChapter04Example,
  },
  {
    chapterId: "ch05",
    memberId: "jihyeon",
    title: "Chapter 05 말 줄임",
    description:
      "canvas 측정·replica·scrollHeight·바닐라 구현으로 비교한 line-clamp 예제 모음입니다.",
    Component: JihyeonChapter05Example,
  },
  {
    chapterId: "ch06",
    memberId: "jihyeon",
    title: "Chapter 06 폼 컨트롤",
    description:
      "구분 기호 자동 삽입 인풋과 비제어 폼 유효성 검증 예제 모음입니다.",
    Component: JihyeonChapter06Example,
  },
  {
    chapterId: "ch05",
    memberId: "changjun",
    title: "말줄임",
    description:
      "-webkit-line-clamp로 자른 텍스트에서 '더보기' 버튼을 언제 보여줄지, 줄 수를 canvas·replica·scrollHeight로 재어 비교한 예제 모음입니다.",
    Component: ChangjunChapter05Example,
  },
  {
    chapterId: "ch06",
    memberId: "changjun",
    title: "폼 컨트롤",
    description:
      "구분 기호 자동 삽입 인풋과, 같은 회원가입 폼을 비제어·제어 두 방식으로 만들어 값과 검증의 소유권을 비교한 예제 모음입니다.",
    Component: ChangjunChapter06Example,
  },
  {
    chapterId: "ch07",
    memberId: "changjun",
    title: "이미지 지연 로딩",
    description:
      "직접 좌표 계산, IntersectionObserver, 네이티브 loading 속성, Vanilla 구현을 비교한 이미지 지연 로딩 예제입니다.",
    Component: ChangjunChapter07Example,
  },
  {
    chapterId: "ch08",
    memberId: "changjun",
    title: "페이지네이션과 무한 스크롤",
    description:
      "전통 페이지네이션, React Transition 비교, IntersectionObserver 무한 스크롤과 content-visibility 최적화 예제입니다.",
    Component: ChangjunChapter08Example,
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
