import { useEffect, useRef, useState } from "react";
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
const TabMenu3_2 = () => {
  const [current, setCurrent] = useState<string>(data[0].id);
  const toggleItem = (id: string) => {
    setCurrent(id);
  };

  return (
    <>
      <h3>#3-2. React</h3>
      <div className={cx("container", "tabMenu3-2")}>
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
        <div className={cx("tabPanel")}>
          {data.map((d) => (
            <TabPanel
              key={d.id}
              current={current === d.id}
              description={d.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const TabPanel = ({
  current,
  description,
}: Pick<TabItem, "description" | "current">) => {
  const [animationClassName, setAnimationClassName] = useState<string | null>(
    current ? "enter" : null,
  );
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current !== current) {
      initRef.current = current;
      setAnimationClassName(current ? "enter" : "exit");
    }
  }, [current]);
  return (
    <div className={cx("description", animationClassName)}>{description}</div>
  );
};

export default TabMenu3_2;
