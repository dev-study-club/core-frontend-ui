import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

type AccordionItem = {
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
};
const AccordionItem = ({
  title,
  description,
  current,
  toggle,
}: AccordionItem) => {
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $desc = descRef.current!;
    $desc.style.maxHeight = current ? `${$desc.scrollHeight}px` : '0';
  }, [current]);

  return (
    <li className={cx('item', 'item3', { current })}>
      <button type="button" className={cx('tab')} onClick={toggle}>
        {title}
      </button>
      <div className={cx('description')} ref={descRef}>
        {description}
      </div>
    </li>
  );
};

const Accordion3 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => {
    setCurrentId(prevId => (prevId === id ? null : id));
  };

  return (
    <>
      <h3>
        #3. React<sub>useRef로 max-height 처리</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map(d => (
          <AccordionItem
            {...d}
            key={d.id}
            current={currentId === d.id}
            toggle={() => toggleItem(d.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion3;
