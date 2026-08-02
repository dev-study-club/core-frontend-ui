import cx from './cx';
import data from './data';

type AccordionItem = {
  title: string;
  description: string;
  initialChecked: boolean;
};
const AccordionItem = ({
  title,
  description,
  initialChecked,
}: AccordionItem) => {
  return (
    <details name="details_5-2" className={cx('item5-2')} open={initialChecked}>
      <summary>{title}</summary>
      <div className={cx('description')}>{description}</div>
    </details>
  );
};

const Accordion5_2 = () => {
  return (
    <>
      <h3>
        #5-2. React<sub>html details만으로 동작</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((d, i) => (
          <AccordionItem {...d} key={d.id} initialChecked={i === 0} />
        ))}
      </ul>
    </>
  );
};

export default Accordion5_2;
