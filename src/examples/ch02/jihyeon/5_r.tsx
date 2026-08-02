import type { CSSProperties } from "react";
import cx from "./cx";
import data from "./data";

type TabItem = {
  id: string;
  title: string;
  description: string;
  initialChecked: boolean;
  index: number;
  total: number;
};

const TabItem = ({
  id,
  title,
  initialChecked,
  description,
  index,
  total,
}: TabItem) => {
  return (
    <li
      className={cx("item")}
      style={{ "--index": index, "--total": total } as CSSProperties}
    >
      <input
        type="radio"
        className={cx("input")}
        name="tabMenu"
        id={id}
        defaultChecked={initialChecked}
      />
      <label htmlFor={id} className={cx("tab")}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

const TabMenu5 = () => {
  return (
    <>
      <h3>
        #5. React<sub>html input(radio)로 처리</sub>
      </h3>
      <ul className={cx("container", "tabMenu5")}>
        {data.map((item, index) => (
          <TabItem
            key={item.id}
            id={item.id}
            title={item.title}
            initialChecked={item.id === data[0].id}
            description={item.description}
            index={index}
            total={data.length}
          />
        ))}
      </ul>
    </>
  );
};

export default TabMenu5;
