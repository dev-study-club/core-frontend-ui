import cx from "./cx";
import ReactiveTextBox1 from "./1_r";
import ReactiveTextBox2 from "./2_r";
import ReactiveTextBox3 from "./3_r";
import ReactiveTextBox4V from "./4_v";

export default function JihyeonChapter04Example() {
  return (
    <section className="example-demo" aria-labelledby="jihyeon-ch04-title">
      <div className={cx("ReactiveTextBoxes")}>
        <h2 id="jihyeon-ch04-title">반응형 텍스트박스</h2>
        <p className={cx("intro")}>
          입력한 내용의 줄 수에 맞춰 textarea 높이를 자동으로 조절합니다.
        </p>
        <ReactiveTextBox1 />
        <ReactiveTextBox2 />
        <ReactiveTextBox3 />
        <ReactiveTextBox4V />
      </div>
    </section>
  );
}
