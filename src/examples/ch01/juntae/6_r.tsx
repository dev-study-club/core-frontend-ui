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
    const desc = descRef.current;
    desc?.addEventListener('beforematch', toggle);
    return () => {
      desc?.removeEventListener('beforematch', toggle);
    };
  }, [toggle]);

  useEffect(() => {
    if (current) {
      descRef.current?.removeAttribute('hidden');
      return;
    }

    descRef.current?.setAttribute('hidden', 'until-found');
  }, [current]);

  return (
    <li className={cx('item', 'item3', { current })}>
      <button type="button" className={cx('tab')} onClick={toggle}>
        {title}
      </button>
      <div
        className={cx('description')}
        ref={descRef}
      >
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
        #6. React<sub>ctrl+F 검색 기능 추가</sub>
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
