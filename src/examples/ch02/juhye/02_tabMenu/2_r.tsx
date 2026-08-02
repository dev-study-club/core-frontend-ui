import { useState } from "react";
import cx from "./cx";
import data from "./data";

type TabItem = {
  id: string;
  title: string;
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

const TabMenu2 = () => {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>
        #2. react<sub>css로 hidden/show 처리</sub>
      </h3>
      <div className={cx("container", "tabMenu2")}>
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
        {data.map(({ id, description }) => (
          <div
            key={id}
            className={cx("description", { current: id === currentId })}
          >
            {description}
          </div>
        ))}
      </div>
    </>
  );
};

export default TabMenu2;
