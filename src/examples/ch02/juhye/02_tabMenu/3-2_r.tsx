import { useState, useEffect, useRef } from "react";
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

const TabPanel = ({
  isCurrent,
  description,
}: {
  description: string;
  isCurrent: boolean;
}) => {
  const [animationClassName, setAnimationClassName] = useState<string | null>(
    isCurrent ? "current" : null,
  );

  const preRef = useRef(isCurrent);

  useEffect(() => {
    if (preRef.current !== isCurrent) {
      // props로 최초렌더링 여부 구분 -> 최초렌더링이 아닌 경우에만 실행
      preRef.current = isCurrent;
      setAnimationClassName(isCurrent ? "enter" : "exit");
    }
  }, [isCurrent]);

  // useEffect(() => {
  //   setAnimationClassName(isCurrent ? "enter" : "exit");
  // }, [isCurrent]);ㅔ

  return (
    <div className={cx("description", animationClassName)}>{description}</div>
  );
};

const TabMenu3_2 = () => {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>
        #3-2. react<sub>css animation (keyframes)</sub>
      </h3>
      <div className={cx("container", "tabMenu3-2")}>
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
            <TabPanel
              key={id}
              description={description}
              isCurrent={id === currentId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TabMenu3_2;
