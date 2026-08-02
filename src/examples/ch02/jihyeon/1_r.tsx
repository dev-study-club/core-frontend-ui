import { useState } from "react";
import cx from "./cx";
import data from "./data";

type TabItem = {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
};

const TabItem = ({ id, title, current, toggle }: TabItem) => {
  return (
    <li className={cx("tab", { current })} key={id}>
      <button type="button" onClick={toggle}>
        {title}
      </button>
    </li>
  );
};
const TabMenu1 = () => {
  const [current, setCurrent] = useState<string>(data[0].id);
  const toggleItem = (id: string) => {
    setCurrent(id);
  };
  return (
    <>
      <h3>#1. React</h3>
      <div className={cx("container")}>
        <ul className={cx("tabList")}>
          {data.map((item) => (
            <TabItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              current={current === item.id}
              toggle={() => toggleItem(item.id)}
            />
          ))}
        </ul>
        <div className={cx("description")}></div>
      </div>
    </>
  );
};
export default TabMenu1;
