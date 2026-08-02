import data from './data';
import cx from './cx';

// details 요소에 name 속성을 추가하면 같은 name 값을 가진 details 요소 중에서는
// 한 번에 하나만 열릴 수 있게 됩니다. 또한 기본적으로 다른 영역을 상호작용하면 열려 있던 details가 닫히는 기능도 제공합니다.

// details 태그의 가장 중요한 단점으로 브라우저 호환성을 들었었습니다. 어떤
// 브라우저가 details 태그의 name 속성을 인식하지 못한다는 것은 곧 ‘한 번에 하나의 항목만 열릴 수 있다’는 제약이 없음을
// 의미한다고도 했습니다. 배타적 아코디언의 경우에는 이 제약이 없더라도 배타성을 잃을 뿐 크게 문제가 되는 건 아니라고 판단할 수 있습니다.
// 미관을 지나치게 방해하는 건 아니기 때문입니다. 반면 툴팁의 경우 배타성을 잃는다는 것은 곧 여러 개의 툴팁으로 화면이
// 뒤덮일 수 있음을 의미하므로, 상대적으로 문제의 소지가 클 수 있습니다.

type TooltipProps = { id: string; text: string; description: string };
const TooltipItem = ({ text, description }: TooltipProps) => {
  return (
    <span className={cx('tooltip-root')}>
      {text}
      <details className={cx('details')} name="tooltip">
        <summary className={cx('tooltip-trigger')} />
        <span className={cx('tooltip-layer')}>{description}</span>
      </details>
    </span>
  );
};

// 앞의 두 코드(컨텍스트 방식 및 이벤트 핸들러 방식)와 비교해 보면, data를 렌더링 하는 것 외에는 아무런 개입도 하지 않는 매우 단순한
// 코드가 되었습니다. React에서 상태(state)는 가장 중요한 개념이기도 하지만, 한편으론 최소한으로 사용할 것을 권장하는 요소이기도
// 합니다. 상태가 줄어드는 만큼 React가 렌더링 과정에 개입할 요소가 줄어들고, 메모리를 덜 차지하게 되며, 그만큼 성능도 좋아지게
// 될 것입니다.

// const getViewportCoords = () => {
//     const {
//     clientWidth, // 화면 넓이
//     clientHeight, // 화면 높이
//     scrollWidth, // 전체 스크롤 넓이
//     scrollHeight // 전체 스크롤 높이
//     scrollLeft, // 스크롤 왼쪽 위치 (전체 스크롤 기준 화면의 왼쪽 좌표)
//     scrollTop, // 스크롤 위쪽 위치 (전체 스크롤 기준 화면의 위쪽 좌표)
//     } = document.scrollingElement
//     return { clientWidth, clientHeight, scrollLeft, scrollTop, scrollHeight } =  document , viewport 의 좌표 정보
//     }
//     getViewportCoords();
// 결과) { clientWidth: 700, clientHeight: 674, scrollLeft: 0, scrollTop: 0, scrollHeight: 2173 }

const Tooltip2_3 = () => {
  return (
    <>
      <h3>
        #2-3. React<sub>하나만 열리도록 처리 - html details 태그 사용</sub>
      </h3>
      {data.map(d => (
        <TooltipItem {...d} key={d.id} />
      ))}
    </>
  );
};

export default Tooltip2_3;
