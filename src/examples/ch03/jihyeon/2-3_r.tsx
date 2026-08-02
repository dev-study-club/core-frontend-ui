import cx from "./cx";
import data from "./data";

export default function Tooltip2_3() {
  return (
    <section className={cx("example")}>
      <h3>
        #2-3. HTML <sub>하나만 열리도록 처리 - html details 태그 사용</sub>
      </h3>
      {data.map(({ id, text, description }) => (
        <TooltipItem key={id} id={id} text={text} description={description} />
      ))}
    </section>
  );
}

type TooltipeProps = { id: string; text: string; description: string };
const TooltipItem = ({ text, description }: TooltipeProps) => {
  return (
    <span className={cx("tooltip-root")}>
      {text}
      <details className={cx("details")} name="tooltip">
        <summary
          className={cx("tooltip-trigger")}
          aria-label={`${text} 설명 보기`}
        />
        <span role="tooltip" className={cx("tooltip-layer")}>
          {description}
        </span>
      </details>
    </span>
  );
};
