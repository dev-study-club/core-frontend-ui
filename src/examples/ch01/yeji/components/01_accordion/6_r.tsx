import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

type AccordionItem = {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
};

const AccordionItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: AccordionItem) => {
  const descRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const description = descRef.current;

    description?.addEventListener('beforematch', toggle);

    if (current) {
      description?.removeAttribute('hidden');
    } else {
      description?.setAttribute('hidden', 'until-found');
    }

    return () => {
      description?.removeEventListener('beforematch', toggle);
    };
  }, [current, toggle]);

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
// beforematch 이벤트는 React의 SyntheticEvent에 포함되지 않으므로, React의 onBeforeMatch 이벤트 리스너를 사용할
// 수 없습니다
// . 따라서 순수 자바스크립트를 사용하여 이벤트 리스너를 직접 등록해야 합니다.

const Accordion6 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => () => {
    setCurrentId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <h3>
        #6. React<sub>Cmd+F 키워드 검색</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map(d => (
          <AccordionItem
            {...d}
            key={d.id}
            current={currentId === d.id}
            toggle={toggleItem(d.id)}
          />
        ))}
      </ul>
    </>
  );
};
export default Accordion6;

// details는 기본으로 hidden="until-found" 속성과 유사하게 동작합니다. 따라서 HIDDEN={...} 속성을
// 추가하지 않아도 검색 기능이 정상적으로 작동하며, beforematch 이벤트 처리도 필요하지 않습니다.
