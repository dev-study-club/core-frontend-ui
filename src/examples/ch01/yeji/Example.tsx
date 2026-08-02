import Accordions from "@/examples/ch01/yeji/components/01_accordion";

export default function YejiChapter01Example() {
  return (
    <section className="example-demo" aria-labelledby="yeji-chapter01-title">
      <p className="eyebrow">Yeji</p>
      <h2 id="yeji-chapter01-title">Chapter 01 Accordion</h2>
      <p>아코디언 예제를 원본 컴포넌트 구조에 맞춰 렌더링합니다.</p>
      <Accordions />
    </section>
  );
}
