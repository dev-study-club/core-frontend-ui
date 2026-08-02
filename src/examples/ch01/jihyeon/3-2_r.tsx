import { useEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";

const Accordion3_2 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => {
    setCurrentId((prevId) => (prevId === id ? null : id));
  };
  return (
    <div>
      <h3>
        #3-2. React<sub>scrollHeight로 max-height</sub>
      </h3>
      <ul className={cx("container")}>
        {data.map(({ id, title, description }) => (
          <AccordionItem
            key={id}
            id={id}
            title={title}
            description={description}
            current={currentId === id}
            toggle={() => toggleItem(id)}
          />
        ))}
      </ul>
    </div>
  );
};

type AccordionItem = {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
};

const AccordionItem = ({
  title,
  description,
  current,
  toggle,
}: AccordionItem) => {
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $desc = descRef.current;
    if ($desc) {
      $desc.style.maxHeight = current ? `${$desc.scrollHeight}px` : "0";
    }
  }, [current]);

  return (
    <li className={cx("item", "item3_2", { current })}>
      <button type="button" className={cx("tab")} onClick={toggle}>
        {title}
      </button>
      {/* padding은 안쪽 — 바깥 scrollHeight 측정과 충돌하지 않음 */}
      <div className={cx("description")} ref={descRef}>
        <div className={cx("descriptionInner")}>{description}</div>
      </div>
    </li>
  );
};

export default Accordion3_2;
