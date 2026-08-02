import cx from "./cx";

import Accordion1 from "./1_r";
import Accordion2 from "./2_r";
import Accordion3 from "./3_r";
import Accordion3_2 from "./3-2_r";
import Accordion4V from "./4_v";
import Accordion5_1 from "./5-1_r";
import Accordion5_2 from "./5-2_r";
import Accordion6 from "./6_r";

export default function JihyeonChapter01Example() {
  return (
    <section className="example-demo" aria-labelledby="jihyeon-ch01-title">
      <div className={cx("Accordions")}>
        <h2>아코디언</h2>
        <Accordion1 />
        <Accordion2 />
        <Accordion3 />
        <Accordion3_2 />
        <Accordion4V />
        <Accordion5_1 />
        <Accordion5_2 />
        <Accordion6 />
      </div>
    </section>
  );
}
