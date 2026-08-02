import cx from './cx';
import data from './data';

type AccordionItem = {
  id: string;
  title: string;
  description: string;
  initialChecked: boolean;
};

// details 태그는 항상 노출되는 summary를 클릭하면 open 속성이 토글 되며, summary 외의 내용이 숨겨지거나 나타나는 방식으로
// 동작합니다. 여기에 name 속성을 추가하면 radio input과 유사하게 한 번에 하나의 항목만 열리도록 설정할 수 있습니다. 또한,
// 열려있는 항목을 닫는 것도 가능합니다. CSS는 다음과 같습니다.

// 이 방식의 가장 큰 단점은 details 태그가 비교적 최근에 등장한 기능이기 때문에 일부 브라우저에서 동작하지 않을 수 있다는 점입니다.
// 또한, 애니메이션을 자연스럽게 처리하기 어렵거나, 브라우저에 따라 불가능한 경우도 있습니다. 따라서 이 방식을 도입할
// 때는 지원해야 하는 브라우저와 디바이스, 애니메이션 적용 필요성 등을 신중히 검토해야 합니다.
// 그렇다고 해서 이 방식을 무조건 지양해야 하는 것은 아닙니다. 브라우저 내장 기능을 활용하면 성능 면에서 유리하며, 브라우저가
// 제공하는 기본 동작과 동일한 사용자 경험을 제공할 수 있다는 장점이 있습니다.

const AccordionItem = ({
  id,
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
export default Accordion5_2;
