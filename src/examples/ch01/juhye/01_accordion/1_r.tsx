import cx from "./cx";
import data from "./data";
import { useState } from "react";

type AccordionItemProps = {
  id: string;
  title: string;
  description: string;
  isCurrent: boolean;
  onToggle: () => void;
};

const AccordionItem = ({
  id,
  title,
  description,
  isCurrent,
  onToggle,
}: AccordionItemProps) => {
  return (
    <li className={cx("item", { current: isCurrent })}>
      <button type="button" className={cx("tab")} onClick={onToggle}>
        {title}
      </button>
      {isCurrent && <div className={cx("description")}>{description}</div>}
    </li>
  );
};

const Accordion1 = () => {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId((prevId) => (prevId === id ? "" : id));
  };

  return (
    <>
      <h3>
        #1. react<sub>현재 desc만 렌더링</sub>
      </h3>
      <ul className={cx("container")}>
        {data.map(({ id, title, description }) => (
          <AccordionItem
            key={id}
            id={id}
            title={title}
            description={description}
            isCurrent={id === currentId}
            onToggle={toggleItem(id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion1;
