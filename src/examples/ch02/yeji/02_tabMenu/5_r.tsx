import cx from './cx';
import data from './data';

type TabItem = {
  id: string;
  title: string;
  description: string;
  initialChecked: boolean;
};

// 이 기법(radio input)은 레이아웃을 임의로 재조정한 형태이기 때문에, 일반적인 레이아웃에서 기대하는 동작과 다른 결과를 초래할 수
// 있습니다. overflow: hidden이나 z-index 등을 조정해 원하는 결과를 얻기 어렵거나 불가능할 수도 있습니다. 따라서 이 기법에서는 CSS
// 애니메이션을 추가하지 않는 편이 안전합니다.

const TabItem = ({ id, title, description, initialChecked }: TabItem) => {
  return (
    <li className={cx('item')}>
      <input
        type="radio"
        className={cx('input')}
        name="tabMenu"
        id={id}
        defaultChecked={initialChecked}
      />
      <label htmlFor={id} className={cx('tab')}>
        {title}
      </label>
      <div className={cx('description')}>{description}</div>
    </li>
  );
};
const TabMenu5 = () => {
  return (
    <>
      <h3>
        #5. React<sub>html input(radio)로 처리</sub>
      </h3>
      <ul className={cx('container', 'tabMenu5')}>
        {data.map((d, i) => (
          <TabItem {...d} key={d.id} initialChecked={i === 0} />
        ))}
      </ul>
    </>
  );
};
export default TabMenu5;
