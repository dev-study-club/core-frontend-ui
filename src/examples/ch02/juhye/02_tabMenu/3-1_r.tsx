import { useState } from "react";
import cx from "./cx";
import data from "./data";

type TabItem = {
  id: string;
  title: string;
  description: string;
  isCurrent: boolean;
  onToggle: () => void;
};

const TabItem = ({ id, title, isCurrent, onToggle }: TabItem) => {
  return (
    <li
      className={cx("tab", { current: isCurrent })}
      onClick={onToggle}
      key={id}
    >
      <button type="button" onClick={onToggle}>
        {title}
      </button>
    </li>
  );
};

const TabMenu3_1 = () => {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>
        #3-1. react<sub>css animation (transition)</sub>
      </h3>
      <div className={cx("container", "tabMenu3-1")}>
        <ul className={cx("tabList")}>
          {data.map(({ id, title }) => (
            <TabItem
              key={id}
              id={id}
              title={title}
              isCurrent={id === currentId}
              onToggle={toggleItem(id)}
            />
          ))}
        </ul>
        <div className={cx("tabPanel")}>
          {data.map(({ id, description }) => (
            <div
              key={id}
              className={cx("description", { current: id === currentId })}
            >
              {description}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TabMenu3_1;
