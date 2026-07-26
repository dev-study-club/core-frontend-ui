import TabMenus from "@/examples/ch02/yeji/02_tabMenu";

export default function YejiChapter02Example() {
  return (
    <section className="example-demo" aria-labelledby="yeji-chapter02-title">
      <p className="eyebrow">Yeji</p>
      <h2 id="yeji-chapter02-title">Chapter 02 Tab Menu</h2>
      <p>탭 메뉴 예제를 원본 컴포넌트 구조에 맞춰 렌더링합니다.</p>
      <TabMenus />
    </section>
  );
}

