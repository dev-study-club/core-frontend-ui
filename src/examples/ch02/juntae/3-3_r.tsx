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

const TabPanel = ({
  description,
  current,
}: Pick<TabItem, "description" | "current">) => {
  const [animationClassName, setAnimationClassName] = useState<string | null>(
    current ? "current" : null,
  );
  const prevRef = useRef(current);

  const handleAnimationEnd = () => {
    setAnimationClassName((prev) => {
      switch (prev) {
        case "exit":
          return null;
        case "enter":
          return "current";
      }
      return prev;
    });
  };

  useEffect(() => {
    if (prevRef.current !== current) {
      prevRef.current = current;
      setAnimationClassName(current ? "enter" : "exit");
    }
  }, [current]);

  return (
    <div
      className={cx("description", animationClassName)}
      onAnimationEnd={handleAnimationEnd}
    >
      {description}
    </div>
  );
};

const TabMenu3_3 = () => {
  const [currentId, setCurrentId] = useState<string>(data[0].id);
  const toggleItem = (id: string) => () => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>
        #3-3. React<sub>애니메이션 종료 시 클래스 제거</sub>
      </h3>
      <div className={cx("container", "tabMenu3-3")}>
        <ul className={cx("tabList")}>
          {data.map((d) => (
            <TabItem
              {...d}
              key={d.id}
              current={currentId === d.id}
              toggle={toggleItem(d.id)}
            />
          ))}
        </ul>
        <div className={cx("tabPanel")}>
          {data.map((d) => (
            <TabPanel key={d.id} {...d} current={currentId === d.id} />
          ))}
        </div>
      </div>
    </>
  );
};
export default TabMenu3_3;
