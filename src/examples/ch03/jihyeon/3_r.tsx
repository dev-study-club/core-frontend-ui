import { useRef } from "react";
import cx from "./cx";
import data from "./data";
import { useScrollInfo } from "./context/viewContext";
import useStyleInsideViewport from "./hooks/useStyleInsideViewport";

export default function Tooltip3() {
  const scrollInfo = useScrollInfo();
  console.log(scrollInfo);
  return (
    <section className={cx("example")}>
      <h3>
        #3. React <sub>화면을 벗어나지 않도록 처리 (1) - 직접 계산</sub>
      </h3>
      {data.map(({ id, text, description }) => (
        <TooltipItem key={id} id={id} text={text} description={description} />
      ))}
    </section>
  );
}
type TooltipeProps = { id: string; text: string; description: string };
const TooltipItem = ({ text, description }: TooltipeProps) => {
  const rootRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLSpanElement>(null);
  const style = useStyleInsideViewport(rootRef, targetRef);
  return (
    <span className={cx("tooltip-root")}>
      {text}
      <details ref={rootRef} className={cx("details")} name="tooltip">
        <summary
          className={cx("tooltip-trigger")}
          aria-label={`${text} 설명 보기`}
        />
        <span ref={targetRef} role="tooltip" className={cx("tooltip-layer")} style={style}>
          {description}
        </span>
      </details>
    </span>
  );
};
