import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
  useReducer,
} from "react";

/* 코어 프런트엔드 UI 5장 '제어 컴포넌트 폼 만들기' 예제입니다.
   2-1(비제어 폼)과 동일한 회원가입 폼을, 이번에는 폼의 모든 값을 하나의 state로 관리하며 만들어 봅니다.
   비제어 폼이 DOM을 값의 원천으로 삼아 제출 시점에 FormData로 한 번에 수집했다면,
   제어 폼은 입력이 발생할 때마다 state에 값을 반영하고, state가 다시 각 input의 value를 내려줍니다. */

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type FormState = {
  __id: string;
  __name: string;
  __gender: string;
  __password: string;
  __password_confirm: string;
  __photo: File | "";
  __salary: string;
  __agree: boolean;
};

/* 리듀서는 여러 개의 state를 하나로 묶어 관리하는 순수 함수입니다.
   특이한 점 하나는, 이 예제의 리듀서는 action 객체를 따로 정의하지 않고
   '이벤트가 발생한 입력 요소($el) 그 자체'를 action으로 받는다는 것입니다. */
const formReducer = (state: FormState, $el: FormElement): FormState => {
  switch ($el.type) {
    /* ② input 요소는 다양한 타입이 있습니다. 체크박스의 경우 value 대신 checked를 담아야 하므로 타입에 따라 분기합니다. */
    case "checkbox":
      return { ...state, [$el.name]: ($el as HTMLInputElement).checked };
    /* ③ input type="file"은 value로 제어할 수 없는 예외적인 입력 요소입니다. 대신 File 객체 자체를 state에 담습니다. */
    case "file":
      return {
        ...state,
        __photo: ($el as HTMLInputElement).files?.[0] ?? "",
      };
    default:
      return { ...state, [$el.name]: $el.value };
  }
};

const defaultFormState: FormState = {
  __id: "",
  __name: "",
  __gender: "남",
  __password: "",
  __password_confirm: "",
  __photo: "",
  __salary: "0",
  __agree: false,
};

/* 제어 컴포넌트로 개조한 구분 기호 자동 삽입 인풋입니다. (책에서는 1절의 digitSeperatedInput 파일을 제어형으로 수정해 사용)
   #1(비제어) 예제가 ref + valueRef로 값을 스스로 관리했다면, 여기서는 value를 props로 받아 부모가 값을 소유합니다.
   숫자 외 문자가 입력되면 onChange에서 모두 제거한 뒤 포매팅하므로, 잘못된 값은 애초에 state에 들어오지 않습니다. */
const DigitSeperatedInput = ({
  name,
  id,
  value,
  onChange,
}: {
  name: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  /* 커서 이동 문제 처리 공식은 #1 예제와 동일합니다.
     커서의 "뒤에서부터 거리(d)"는 포매팅 전후로 변하지 않으므로, d = (입력 전 length) - (입력 전 selectionStart)를
     계산해 두었다가 포매팅 후 (입력 후 length) - d 위치로 커서를 되돌려 놓습니다. */
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    /* React 합성 이벤트에서 target은 EventTarget으로 추론되므로, 타입이 보장되는 currentTarget을 사용합니다. */
    const $el = e.currentTarget;
    const indexFromLast = $el.value.length - ($el.selectionStart || 0);
    const numeric = $el.value.replace(/[^\d]/g, "");
    /* 숫자 외 문자를 전부 제거했으므로 NaN 여부를 검사할 필요가 없습니다. 이것이 제어 방식의 장점입니다. */
    $el.value = numeric ? Number(numeric).toLocaleString() : "";
    /* 부모에 넘기는 이벤트의 target은 실제 DOM 요소이므로, 위에서 교체한 포매팅된 값이 그대로 reducer에 전달됩니다. */
    onChange(e);
    const index = $el.value.length - indexFromLast;
    $el.setSelectionRange(index, index);
  };

  /* 백스페이스로 쉼표 앞의 숫자를 지울 때 쉼표까지 함께 제거하는 처리입니다. (#1 예제와 동일한 로직)
     다만 제어 컴포넌트에서는 DOM 값을 직접 바꾸는 것만으로는 state가 갱신되지 않으므로,
     값 교체 후 input 이벤트를 발생시켜 React의 onChange 체인을 타고 reducer까지 변화가 전달되게 합니다. */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const $el = e.currentTarget;
    const index = $el.selectionStart || 0;
    const currentValue = $el.value;
    if (
      index < 2 ||
      e.key !== "Backspace" ||
      currentValue[index - 1] !== ","
    )
      return;
    e.preventDefault();
    $el.value = `${currentValue.slice(0, index - 2)}${currentValue.slice(index - 1)}`;
    $el.dispatchEvent(new Event("input", { bubbles: true }));
  };

  /* 포커스 시 커서를 맨 뒤로 보내는 처리도 #1과 동일합니다. rAF는 "브라우저 기본 동작 → rAF → 페인트" 순서에서
     실행되므로, 브라우저가 배치한 기본 커서 위치를 페인트 직전에 덮어쓸 수 있습니다. */
  const handleFocus = () => {
    window.requestAnimationFrame(() => {
      const $el = inputRef.current;
      if (!$el) return;
      const pos = $el.value.length;
      $el.setSelectionRange(pos, pos);
    });
  };

  return (
    <input
      type="text"
      ref={inputRef}
      name={name}
      id={id}
      value={value}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
    />
  );
};

const Form2 = () => {
  /* ① useReducer는 여러 개의 값을 포함하는 하나의 state를 다룰 때 유용한 훅입니다.
     상태 갱신 로직(formReducer)을 컴포넌트 바깥의 순수 함수로 분리할 수 있다는 점이 특징이며,
     dispatch(action) 실행 시 (현재 state, action)와 함께 리듀서가 호출되고, 그 반환값이 다음 state가 됩니다. */
  const [formState, dispatch] = useReducer(formReducer, defaultFormState);

  /* ⑤ handleChange는 이벤트 위임을 활용해 form 요소에 하나만 등록합니다. 이벤트가 발생한 실제 input 요소($el)를
     그대로 dispatch에 전달하면, reducer가 그 요소의 type과 name을 보고 어느 필드를 어떻게 갱신할지 스스로 판단합니다.
     덕분에 필드가 아무리 많아도 handleChange를 각 input마다 반복 작성할 필요가 없습니다. */
  const handleChange = useCallback((e: FormEvent) => {
    dispatch(e.target as FormElement);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      /* 제어 폼에서는 이미 모든 값이 state에 들어 있으므로, 제출 시점에 FormData를 새로 만들 필요가 없습니다. */
      console.log(formState);
    },
    [formState]
  );

  return (
    <>
      <h3>
        #2-2. React<sub>제어 폼</sub>
      </h3>
      <form
        id="__registerForm"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <fieldset>
          <legend>회원가입</legend>
          <p>
            <label htmlFor="__id">아이디: </label>
            {/* 네이티브 검증 속성(required, pattern, minLength 등)은 그대로 남겨 둡니다.
                제어 폼이라고 해서 네이티브 검증을 쓸 수 없는 것이 아니며, 유효/무효 상태에 따른
                CSS 스타일링(:valid / :invalid)도 그대로 활용할 수 있습니다. */}
            <input
              id="__id"
              name="__id"
              type="text"
              required
              minLength={4}
              maxLength={12}
              pattern="^[A-z_0-9]{1,}$"
              value={formState.__id}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="__name">이름: </label>
            <input
              id="__name"
              name="__name"
              type="text"
              required
              pattern="^([가-힣]){1,}$"
              minLength={2}
              value={formState.__name}
              onChange={handleChange}
            />
          </p>
          <p>
            <label>성별: </label>
            {/* radio도 checked를 state와 연결해 제어합니다. name이 같은 그룹 중
                checked={...} 조건을 만족하는 요소 하나만 선택된 것으로 표시됩니다. */}
            <input
              id="__gender_male"
              name="__gender"
              type="radio"
              value="남"
              required
              checked={formState.__gender === "남"}
              onChange={handleChange}
            />{" "}
            <label htmlFor="__gender_male">남</label>
            <input
              id="__gender_female"
              name="__gender"
              type="radio"
              value="여"
              checked={formState.__gender === "여"}
              onChange={handleChange}
            />
            <label htmlFor="__gender_female">여</label>
          </p>
          <p>
            <label htmlFor="__password">비밀번호: </label>
            <input
              id="__password"
              name="__password"
              type="password"
              required
              autoComplete="off"
              value={formState.__password}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="__password_confirm">비밀번호 확인: </label>
            {/* 비제어 폼(2-1)에서는 name을 생략해 전송 데이터에서 제외했다면, 제어 폼에서는 state의 키가 되므로
                name을 부여합니다. 제출 시점에 필요 없다면 그때 가서 제외하면 됩니다. */}
            <input
              id="__password_confirm"
              name="__password_confirm"
              type="password"
              required
              autoComplete="off"
              value={formState.__password_confirm}
              onChange={handleChange}
            />
          </p>
          <div>
            <label htmlFor="__photo">프로필사진: </label>
            <input
              id="__photo"
              name="__photo"
              type="file"
              required
              accept="image/png, image/jpeg"
              onChange={handleChange}
            />
            <div>
              {/* 미리보기 URL은 File 객체로부터 바로 생성합니다. 2-1(비제어)에서는 img DOM에 직접 접근해 src를
                  교체했던 부분인데, 제어 폼에서는 state(formState.__photo)만 바라보면 됩니다.
                  (렌더링마다 ObjectURL이 새로 생성되는 점은 미리보기용이라 큰 문제가 없지만, 엄밀히는 메모리 관리를 위해
                  useEffect에서 생성/해제(revokeObjectURL)를 관리하는 것이 더 좋은 방법입니다) */}
              <img
                src={
                  formState.__photo
                    ? URL.createObjectURL(formState.__photo)
                    : ""
                }
                alt=""
              />
            </div>
          </div>
          <p>
            <label htmlFor="__salary">(선택) 연봉: </label>
            {/* ④ 기존의 DigitSeperatedInput(비제어)에 value와 onChange를 전달해 제어 컴포넌트로 개조했습니다. */}
            <DigitSeperatedInput
              name="__salary"
              id="__salary"
              value={formState.__salary}
              onChange={handleChange}
            />{" "}
            원
          </p>
          <p>
            <input
              id="__agree"
              name="__agree"
              type="checkbox"
              required
              checked={formState.__agree}
              onChange={handleChange}
            />
            <label htmlFor="__agree">약관에 동의합니다</label>
          </p>
        </fieldset>
      </form>
      <button type="submit" form="__registerForm">
        제출
      </button>{" "}
    </>
  );
};

export default Form2;

/* [비제어(2-1) vs 제어(2-2) 정리]
   • 값의 원천: 비제어는 DOM, 제어는 React state(useReducer로 관리).
   • 값 수집: 비제어는 제출 시점에 FormData로 한 번에 수집, 제어는 입력이 발생할 때마다 reducer가 반영.
   • 검증: 네이티브 검증 속성(required, pattern 등)은 두 방식 모두에서 그대로 활용 가능.
   • 이벤트 핸들러: 비제어는 폼에 onInput 위임, 제어는 폼에 onChange 위임 — 이벤트가 발생한 요소를 그대로 활용한다는 점이 동일.
   • 파일/체크박스: file은 value로 제어 불가하므로 File을 state에 직접 저장, checkbox는 checked로 제어.
   • 트레이드오프: 제어 폼은 입력 시마다 재렌더링이 발생합니다. 폼이 커지면 이 비용이 커지므로,
     비제어의 '제출 시점 일괄 수집' 전략과 상황에 따라 전략적으로 조합하는 것이 좋습니다. */
