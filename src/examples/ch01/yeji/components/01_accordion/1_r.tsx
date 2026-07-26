import { useState } from 'react';
import cx from './cx';
import data from './data';

// 이 방식은 검색엔진에 제공할 정보의 질을 떨어뜨립니다.
// 검색엔진은 보통 URL로 접근해 내려받은 HTML을 크롤링 하는데, HTML 문서상의 아코디언에 오직 하나의 상세만 존재하고 나머지
// 항목들의 상세는 비어 있을 것이기 때문입니다. 노출되지 않은 상세들은 “페이지 내 검색(ctrl+F)”을 통해서도 찾아볼 수 없다는 점도
// 문제입니다.

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
  return (
    <li className={cx('item', { current })} key={id}>
      <button type="button" className={cx('tab')} onClick={toggle}>
        {title}
      </button>
      {current && <div className={cx('description')}>{description}</div>}
    </li>
  );
};
const Accordion1 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => () => {
    setCurrentId(prev => (prev === id ? null : id));
  };
  return (
    <>
      <h3>
        #1. React<sub>현재 desc만 렌더링</sub>
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
export default Accordion1;
