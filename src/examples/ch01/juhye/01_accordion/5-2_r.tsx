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
    <details name="details_5-2" className={cx("item5-2")} open={initialChecked}>
      <summary>{title}</summary>
      <div className={cx("description")}>{description}</div>
    </details>
  );
};

const Accordion5_2 = () => {
  return (
    <>
      <h3>
        #5-2. react<sub>details/summary 활용 </sub>
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

export default Accordion5_2;
