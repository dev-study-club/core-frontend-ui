import cx from "./cx";
import data from "./data";

type AccordionItemProps = {
  id: string;
  title: string;
  description: string;
  initialChecked: boolean;
};

const AccordionItem = ({
  id,
  title,
  description,
  initialChecked,
}: AccordionItemProps) => {
  return (
    <li className={cx("item", "item5-1")}>
      <input
        className={cx("input")}
        defaultChecked={initialChecked}
        type="radio"
        name="accordion"
        id={id}
      />
      <label className={cx("tab")} htmlFor={id}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

const Accordion5_1 = () => {
  return (
    <>
      <h3>
        #5-1. react<sub>input radio 활용 </sub>
      </h3>
      <ul className={cx("container")}>
        {data.map(({ id, title, description }, index) => (
          <AccordionItem
            key={id}
            id={id}
            title={title}
            description={description}
            initialChecked={index === 0}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion5_1;
