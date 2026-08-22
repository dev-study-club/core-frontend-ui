import cx from "./cx";

import Form1 from "./2-1_uncontrolled";
import Form2 from "./2-2_controlled";
import { DigitSeperatedInput } from "./1_digitSeperatedInput";

export default function JihyeonChapter06Example() {
  return (
    <section className="example-demo" aria-labelledby="jihyeon-ch06-title">
      <div className={cx("Forms")} style={{ marginBottom: 500 }}>
        <h2>폼 컨트롤</h2>
        <DigitSeperatedInput name="salary" id="salary" />
        <Form1 />
        <Form2 />
      </div>
    </section>
  );
}
