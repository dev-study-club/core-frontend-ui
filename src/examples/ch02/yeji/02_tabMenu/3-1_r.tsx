import { useState } from 'react';
import cx from './cx';
import data from './data';
type TabItem = {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
};
const TabItem = ({ id, title, current, toggle }: TabItem) => {
  return (
    <li className={cx('tab', { current })} key={id}>
      <button type="button" onClick={toggle}>
        {title}
      </button>
    </li>
  );
};

const TabMenu3_1 = () => {
  const [currentId, setCurrentId] = useState<string>(data[0].id);
  const toggleItem = (id: string) => () => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>
        #3-1. React<sub>css animation (transition)</sub>
      </h3>
      <div className={cx('container', 'tabMenu3-1')}>
        <ul className={cx('tabList')}>
          {data.map(d => (
            <TabItem
              key={d.id}
              {...d}
              current={currentId === d.id}
              toggle={toggleItem(d.id)}
            />
          ))}
        </ul>
        <div className={cx('tabPanel')}>
          {/* div로 상세 영역을 한 번 감싸주었습니다. 이는 애니메이션으로 인해 영역이 넘치더라도 넘친 부분이 보이지 않도록 하기 위함입니다. */}
          {data.map(d => (
            <div
              key={d.id}
              className={cx('description', { current: currentId === d.id })}
            >
              {d.description}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default TabMenu3_1;
