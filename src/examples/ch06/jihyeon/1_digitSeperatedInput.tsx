import { KeyboardEvent, useCallback, useRef } from "react";

export const DigitSeperatedInput = ({
  name,
  id,
}: {
  name: string;
  id: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef("0");
  /**
   * 커서 이동/백스페이스 문제 (숫자 포맷팅으로 길이 변화 발생 시)
   * - 핵심: 커서의 "뒤에서부터 거리(d)"는 포맷팅 전후로 변하지 않는다.
   * - 공식: d = (입력 전 length) - (입력 전 selectionStart)
   *         newIndex = (입력 후 length) - d(입력 후 커서의 index)
   * - 절차: (1) d 계산 → (2) 값 포맷팅(toLocaleString) → (3) setSelectionRange(newIndex, newIndex)
   * - 예시: '1|,000' → beforeLen=5, sel=1 → d=4, afterLen=6 → newIndex=2 → '19|,000'
   */
  const handleInput = useCallback(() => {
    const $el = inputRef.current!;
    const indexFromLast = $el.value.length - ($el.selectionStart || 0);
    const originalValue = Number($el.value.replace(/,/g, ""));
    const errorRef = useRef<HTMLSpanElement>(null);

    /**
     * 숫자가 아닌 값을 숫자로 강제 형 변환하면 NaN이 됩니다. 따라서 기존에 저장해 둔 값으로 되돌립니다.
     */
    if (Number.isNaN(originalValue)) {
      $el.setCustomValidity("숫자만 입력 가능합니다.");
      $el.value = valueRef.current;
    } else {
      $el.setCustomValidity("");
      $el.value = originalValue.toLocaleString();
      valueRef.current = $el.value;
    }

    /**
     * checkValidity는 reportValidity의 두 기능(유효성 점검 및 보고) 중, 오직 유효성 여부 체크만을 수행하는 메서드입니다.
     * - checkValidity : 유효성 여부 체크만 수행하고, 유효하지 않으면 자동으로 에러 메시지를 설정합니다.
     * - reportValidity : 유효성 여부 체크 후, 유효하지 않으면 에러 메시지를 설정하고, 유효하면 에러 메시지를 제거합니다.
     */
    $el.checkValidity();
    errorRef.current!.textContent = $el.validationMessage;

    const index = $el.value.length - indexFromLast;
    $el.setSelectionRange(index, index);
  }, []);

  /**
   * 백스페이스 문제 (쉼표 삭제 시)
   * - 핵심: 쉼표 앞에는 최소한 한 개 이상의 숫자가 있을 수밖에 없다.
   * - 절차: (1) 쉼표 앞의 숫자 삭제 → (2) 커서 위치 재조정
   * - 예시: '19|,000' → sel=2 → '1|,000' → sel=1 → '10|,000' → sel=2
   */
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const $el = inputRef.current!;
    const index = $el.selectionStart || 0;
    const value = $el.value;
    if (index < 2 || e.key !== "Backspace" || value[index - 1] !== ",") return;
    $el.value = `${value.slice(0, index - 2)}${value.slice(index - 1)}`;
    $el.setSelectionRange(index - 1, index - 1);
  }, []);

  /**
   * 포커스 문제 (커서 위치 재조정)
   * - 핵심: 포커스 이벤트가 발생하면, 커서를 맨 뒤로 이동한다.
   * - 절차: (1) requestAnimationFrame → (2) 커서 위치 재조정
   * - 예시: '1|,000' → sel=2 → '1|,000' → sel=2
   * - 주의: requestAnimationFrame을 사용하는 이유는, 브라우저 기본 동작 → rAF → 페인트 순서이므로, rAF가 “정확하고 빠르게” 캐럿을 덮어쓸 수 있기 때문이다.
   */
  const handleFocus = useCallback(() => {
    window.requestAnimationFrame(() => {
      const $el = inputRef.current;
      if (!$el) return;
      const pos = $el.value.length;
      $el.setSelectionRange(pos, pos);
    });
  }, []);

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        defaultValue={0}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
    </>
  );
};

const DigitSeperatedInputContainer = () => (
  <>
    <h3>
      #1. React<sub>구분 기호 자동 삽입 인풋</sub>
    </h3>
    <DigitSeperatedInput name="salary" id="salary" />
  </>
);
export default DigitSeperatedInputContainer;
