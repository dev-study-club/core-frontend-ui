import cx from "./cx";
import data from "./data";

const Accordion5_1 = () => {
  return (
    <div>
      <h3>
        #5-1. React<sub>html input(radio)만으로 동작</sub>
      </h3>
      <ul className={cx("container")}>
        {data.map(({ id, title, description }) => (
          <AccordionItem
            key={id}
            id={id}
            title={title}
            description={description}
            initialChecked={id === data[0].id}
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
  initialChecked: boolean;
};

const AccordionItem = ({
  id,
  title,
  description,
  initialChecked,
}: AccordionItem) => {
  return (
    <li className={cx("item", "item5-1")}>
      <input
        className={cx("input")}
        type="radio"
        name="accordion"
        id={id}
        defaultChecked={initialChecked}
      />
      <label className={cx("tab")} htmlFor={id}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

export default Accordion5_1;
