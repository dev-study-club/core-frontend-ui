import cx from './cx';
import data from './data';

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
    <li className={cx('item', 'item5-1')}>
      <input
        className={cx('input')}
        type="radio"
        name="accordion"
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

const Accordion5_1 = () => {
  return (
    <>
      <h3>
        #5-1. React<sub>html input(radio)만으로 동작</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((d, i) => (
          <AccordionItem {...d} key={d.id} initialChecked={i === 0} />
        ))}
      </ul>
    </>
  );
};
export default Accordion5_1;

// React는 이 컴포넌트를 최초 한 번만 렌더링하고 이후로는 관여하지 않습니다. 이 방식은 간단하고 잘 동작하지만, 선택을 해제할 수
// 없고 반드시 하나의 항목이 펼쳐져 있어야 한다는 단점이 있습니다. 이는 radio input의 본래 목적에 부합하는 자연스러운 현상이지만,
// 모든 항목을 접을 수 있는 기능이 필요하다면 적합하지 않을 수 있습니다.
// radio input을 유지하면서 선택 해제를 구현하는 방법도 있습니다. 예를 들어 input 요소를 React 대신 직접 렌더링 해서 제어하거나,
// label에 클릭 이벤트 리스너를 추가하고 checked를 상태 변수로 관리하는 방식이 있습니다. 하지만 이러한 방식은 코드가 복잡해지고,
// 버그가 발생할 가능성이 높아 권장하지 않습니다.
