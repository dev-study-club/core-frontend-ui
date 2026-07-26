import TabMenus from "@/examples/ch02/juhye/02_tabMenu/index";

export default function JuhyeChapter02() {
  return (
    <section className="example-demo" aria-labelledby="sample-example-title">
      <p className="eyebrow">Sample</p>
      <h2 id="sample-example-title">Chapter 02 예제 자리</h2>
      <p>
        각자의 예제는 이 컴포넌트를 교체하거나 같은 구조로 새 폴더를 만들어
        등록하면 됩니다.
      </p>

      <TabMenus />
    </section>
  );
}
