import cx from "./cx";
import data from "./data";

const Accordion5_2 = () => {
  return (
    <div>
      <h3>
        #5-2. React<sub>details + js 동작</sub>
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
    <details name="details_5-2" className={cx("item5-2")} open={initialChecked}>
      <summary>{title}</summary>
      <div className={cx("description")}>{description}</div>
    </details>
  );
};

export default Accordion5_2;
