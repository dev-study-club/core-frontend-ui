import cx from "./cx";
import TabMenu1 from "./1_r";
import TabMenu2 from "./2_r";
import TabMenu3_1 from "./3-1_r";
import TabMenu3_2 from "./3-2_r";
import TabMenu3_3 from "./3-3_r";
import TabMenu4V from "./4_v";
import TabMenu5 from "./5_r";

//JihyeonChapter02Example
export default function TabMenus() {
  return (
    <section className="example-demo" aria-labelledby="jihyeon-ch02-title">
      <div className={cx("TabMenus")}>
        <h2>탭 메뉴</h2>
        <TabMenu1 />
        <TabMenu2 />
        <TabMenu3_1 />
        <TabMenu3_2 />
        <TabMenu3_3 />
        <TabMenu4V />
        <TabMenu5 />
      </div>
    </section>
  );
}
