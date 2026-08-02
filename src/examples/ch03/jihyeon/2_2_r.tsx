import { useState } from "react";
import cx from "./cx";
import data from "./data";
import useClickOutside from "./hooks/useClickOutside";

export default function Tooltip2_2() {
  return (
    <section className={cx("example")}>
      <h3>
        #2-2. React <sub>하나만 열리도록 처리 - 이벤트 핸들러</sub>
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

const TooltipDescription = ({
  description,
  handleCLose,
}: {
  description: string;
  handleCLose: () => void;
}) => {
  const ref = useClickOutside(handleCLose);
  return (
    <span ref={ref} role="tooltip" className={cx("tooltip-layer")}>
      {description}
    </span>
  );
};

const TooltipItem = ({ id, text, description }: TooltipProps) => {
  const [isOpen, toggle] = useState<boolean>(false);
  const handleClick = () => {
    toggle((prev) => !prev);
  };
  const handleClose = () => {
    toggle(false);
  };
  return (
    <span className={cx("tooltip-root")}>
      {text}
      <span
        className={cx("tooltip-trigger", { open: isOpen })}
        onClick={handleClick}
      >
        {isOpen && (
          <TooltipDescription
            description={description}
            handleCLose={handleClose}
          />
        )}
      </span>
    </span>
  );
};
