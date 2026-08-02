import { useCallback, useEffect, useState } from 'react';
import cx from './cx';
import data from './data';
import useClickOutside from '@/hooks/useClickOutside';

type TooltipProps = { id: string; text: string; description: string };
const TooltipDescription = ({
  description,
  handleClose,
}: {
  description: string;
  handleClose: () => void;
}) => {
  const ref = useClickOutside(handleClose);
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handleClose();
    },
    [handleClose]
  );
  useEffect(() => {
    if (typeof document === 'undefined') return;
    // 세 번째 인자로 { capture: true }를 전달했는데, 이는 버블링이 아닌 캡처링 단계에서 이 이벤트 핸들러를 호출하도록 하는 옵션입니다
    // 툴팁 닫기’ 기능은 버블링 여부와 무관하게 항상 동작하는것이 바람직할 것이므로, 캡처링 단계에서 이를 실행하도록 한 것입니다.
    document.addEventListener('click', handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);
  return (
    <span className={cx('tooltip-layer')} ref={ref}>
      {description}
    </span>
  );
};

const TooltipItem = ({ id, text, description }: TooltipProps) => {
  const [isOpen, toggle] = useState(false);

  const handleClick = () => {
    toggle(prev => !prev);
  };
  const handleClose = () => toggle(false);

  return (
    <span className={cx('tooltip-root')}>
      {text}
      <span
        className={cx('tooltip-trigger', { open: isOpen })}
        onClick={handleClick}
      >
        {isOpen && (
          <TooltipDescription
            description={description}
            handleClose={handleClose}
          />
        )}
      </span>
    </span>
  );
};
const Tooltip2_2 = () => {
  return (
    <>
      <h3>
        #1. React<sub>터치 또는 클릭으로 동작하는 툴팁</sub>
      </h3>
      {data.map(d => (
        <TooltipItem {...d} key={d.id} />
      ))}
    </>
  );
};
export default Tooltip2_2;
