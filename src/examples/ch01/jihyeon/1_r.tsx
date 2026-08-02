import { useState } from "react";
import cx from "./cx";
import data from "./data";

const Accordion1 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => {
    setCurrentId((prevId) => (prevId === id ? null : id));
  };
  return (
    <div>
      <h3>#1. React</h3>
      <ul className={cx("container")}>
        {data.map(({ id, title, description }) => (
          <AccordionItem
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
  id,
  title,
  description,
  current,
  toggle,
}: AccordionItem) => {
  return (
    <li className={cx("item", { current })} key={id}>
      <button type="button" className={cx("tab")} onClick={toggle}>
        {title}
      </button>
      {current && <div className={cx("description")}>{description}</div>}
    </li>
  );
};

export default Accordion1;
