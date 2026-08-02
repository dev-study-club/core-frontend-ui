import cx from "./cx";
import data from "./data";

export default function Tooltip4() {
  return (
    <section className={cx("example")}>
      <h3>
        #4. React <sub>anchor positioning</sub>
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
      <details className={cx("details", "anchor")} name="tooltip">
        <summary
          className={cx("tooltip-trigger")}
          aria-label={`${text} 설명 보기`}
        />
      </details>
      <span role="tooltip" className={cx("anchor-target")}>
        {description}
      </span>
    </span>
  );
};
