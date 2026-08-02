import Tooltips from "@/examples/ch03/yeji/03_Tooltip";

export default function YejiChapter03Example() {
  return (
    <section className="example-demo" aria-labelledby="yeji-chapter03-title">
      <p className="eyebrow">Yeji</p>
      <h2 id="yeji-chapter03-title">Chapter 03 Tooltip</h2>
      <p>툴팁 예제를 원본 컴포넌트 구조에 맞춰 렌더링합니다.</p>
      <Tooltips />
    </section>
  );
}

