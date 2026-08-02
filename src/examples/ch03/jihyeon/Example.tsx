import cx from "./cx";
import Tooltip1 from "./1_r";
import Tooltip2_1 from "./2_1_r";
import Tooltip2_2 from "./2_2_r";
import Tooltip2_3 from "./2-3_r";
import Tooltip3 from "./3_r";
import Tooltip4 from "./4_r";
import Tooltip5V from "./5_v";
import ViewportContextProvider from "./context/viewContext";
import SingleOpenProvider from "./context/singleOpenContext";

export default function JihyeonChapter03Example() {
  return (
    <ViewportContextProvider>
      <section className="example-demo" aria-labelledby="jihyeon-ch03-title">
        <div className={cx("Tooltips")}>
          <h2 id="jihyeon-ch03-title">툴팁</h2>
          <p className={cx("description")}>
            같은 정보를 상황에 맞는 상태 관리와 브라우저 기능으로 표시합니다.
          </p>
          <Tooltip1 />
          <SingleOpenProvider>
            <Tooltip2_1 />
          </SingleOpenProvider>
          <Tooltip2_2 />
          <Tooltip2_3 />
          <Tooltip3 />
          <Tooltip4 />
          <Tooltip5V />
        </div>
      </section>
    </ViewportContextProvider>
  );
}
