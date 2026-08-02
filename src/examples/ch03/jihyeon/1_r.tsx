import { useState } from "react";
import cx from "./cx";
import data from "./data";

export default function Tooltip1() {
  return (
    <section className={cx("example")}>
      <h3>
        #1. React <sub>터치 또는 클릭으로 동작하는 툴팁</sub>
      </h3>
      {data.map(({ id, text, description }) => (
        <TooltipItem key={id} text={text} description={description} />
      ))}
    </section>
  );
}

type TooltipProps = { text: string; description: string };
const TooltipItem = ({ text, description }: TooltipProps) => {
  const [isOpen, toggle] = useState<boolean>(false);
  const handleClick = () => {
    toggle((prev) => !prev);
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
