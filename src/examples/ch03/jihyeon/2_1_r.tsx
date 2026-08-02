import cx from "./cx";
import data from "./data";
import { useSingleOpen } from "./context/singleOpenContext";

export default function Tooltip2_1() {
  return (
    <section className={cx("example")}>
      <h3>
        #2-1. React <sub>공유 상태로 하나의 툴팁만 열기</sub>
      </h3>
      {data.map(({ id, text, description }) => (
        <TooltipItem key={id} id={id} text={text} description={description} />
      ))}
    </section>
  );
}
type TooltipProps = {
  id: string;
  text: string;
  description: string;
};

const TooltipItem = ({ id, text, description }: TooltipProps) => {
  const [isOpen, toggle] = useSingleOpen(id);
  const handleClick = () => {
    toggle((prev) => (prev === id ? null : id));
  };
  return (
    <span className={cx("tooltip-root")}>
      {text}
      <span
        className={cx("tooltip-trigger", { open: isOpen })}
        onClick={handleClick}
      >
        {isOpen && (
          <span role="tooltip" className={cx("tooltip-layer")}>
            {description}
          </span>
        )}
      </span>
    </span>
  );
};
