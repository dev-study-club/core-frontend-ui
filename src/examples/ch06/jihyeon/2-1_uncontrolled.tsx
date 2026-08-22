import type { FormEvent } from "react";
import { DigitSeperatedInput } from "./1_digitSeperatedInput";

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/* 유효성 검증을 위한 키 모음입니다. ValidityState 프로퍼티들 중에서 customError와 valid를 제외한 나머지를 담았습니다. */
const validationKeys: (keyof ValidityState)[] = [
  "badInput",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort",
  "typeMismatch",
  "valueMissing",
];

type FormControl = Partial<
  Record<keyof ValidityState, string> & {
    additionalValidator: ($el: FormElement, formData: FormData) => boolean;
    onInput: ($el: FormElement, formData: FormData) => void;
    transformData: (formData: FormData) => string | File;
  }
>;

const formController: Record<string, FormControl> = {
  _id: {
    valueMissing: "아이디를 입력하세요.",
    patternMismatch: "아이디는 영어나 숫자 또는 _ 만 입력할 수 있습니다.",
    tooShort: "아이디는 네 글자 이상 입력해 주세요.",
  },
  _name: {
    valueMissing: "이름을 입력하세요.",
    patternMismatch: "띄어쓰기 없이 한글만 입력하세요.",
    tooShort: "이름은 두 글자 이상 입력하세요.",
  },
  password_confirm: {
    additionalValidator: ($el, formData) =>
      $el.value === formData.get("password"),
    customError: "비밀번호가 일치하지 않습니다.",
  },
  photo: {
    /* photo의 onInput 함수 내부에서, 저는 DOM 요소에 직접 접근해서 명령형으로 처리하도록 했는데, 그 대신 url을 state로 만들어서
       관리(setState)하는 방법도 괜찮을 것 같네요. 다만 그러기 위해서는 formController 전체를 React 컴포넌트 안으로 옮기고, memoization 처리를
       하는 등의 후처리가 필요할 것입니다. 이건 독자 여러분의 몫으로 남겨 놓겠습니다. */
    onInput($el, formData) {
      const photo = formData.get("photo") as File;
      const $img = $el.parentElement?.querySelector("img");
      if ($img) {
        $img.src = photo ? URL.createObjectURL(photo) : "";
      }
    },
  },
  salary: {
    transformData: (formData) =>
      (formData.get("salary") as string).replace(/,/g, "") /* 1 */,
  },
};

/* 132부터 읽기 */
const handleInput = (e: FormEvent) => {
  e.preventDefault();
  const $el = e.target as FormElement;
  const formData = new FormData($el.form!);
  const inputController = formController[$el.id];
  const { additionalValidator, customError = "[custom error]" } =
    inputController || {};
  if (additionalValidator && !additionalValidator($el, formData)) {
    $el.setCustomValidity(customError);
  } else {
    const invalidKey = validationKeys.find((k) => $el.validity[k]);
    const errorText = (invalidKey && inputController?.[invalidKey]) || "";
    $el.setCustomValidity(errorText);
  }
  inputController?.onInput?.($el, formData);
  $el.reportValidity();
};
/* handleInput 함수를 컴포넌트 외부에서 선언한 것에 대해서도 의아해하실 수 있는데, 컴포넌트 내부의 변수에 의존하지 않는 순수 함수는
   가능한 외부에서 선언하는 것이 좋습니다. 컴포넌트 내부의 함수는 재 렌더링 시마다 매번 새로 선언하는 반면 외부 함수는 그렇지 않기
   때문입니다 */

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  const $form = e.target as HTMLFormElement;
  const data = new FormData($form);
  for (const [key] of data) {
    if (formController[key]?.transformData) {
      data.set(key, formController[key].transformData(data));
    }
  }
  console.log(Object.fromEntries(data)); /* 3 */
};

const Form1 = () => {
  return (
    <>
      <h3>
        #2-1. React<sub>비제어 폼</sub>
      </h3>
      <form id="registerForm" onInput={handleInput} onSubmit={handleSubmit}>
        {/* form 요소에 직접 이벤트 리스너를 설정하는 것이 낯선 분도 있을 것 같네요. form 요소에 이벤트 리스너를 설정하면, 내부의 각 입력 요소마다
      이벤트 리스너를 설정한 것과 동일한 효과를 누릴 수 있습니다. 어떤 요소에서 입력 이벤트가 발생하든지 form에 등록한 핸들러 함수가 호출됩니다.
      이벤트 버블링 때문. */}
        <fieldset>
          <legend>회원가입</legend>
          <p>
            <label htmlFor="_id">아이디: </label>
            {/* label의 htmlFor는 해당 레이블을 클릭했을 때 포커스 시키고자 하는 입력 요소의 id를 대입합니다.  */}
            <input
              id="_id"
              name="id"
              /* input의 name 프로퍼티는 폼 제출(submit) 시에 전송할 데이터의 프로퍼티 키(key)가 됩니다. */
              type="text"
              required /* 1 */
              pattern="^[A-z_0-9]{1,}$"
              minLength={4}
              maxLength={12}
            />
          </p>
          <p>
            <label htmlFor="_name">이름: </label>
            <input
              id="_name"
              name="name"
              type="text"
              required
              pattern="^([가-힣]){1,}$"
              minLength={2}
            />
          </p>
          <p>
            <label>성별: </label>
            <input
              id="gender_male"
              name="gender"
              type="radio"
              value="남"
              required
            />{" "}
            <label htmlFor="gender_male">남</label>
            <input id="gender_female" name="gender" type="radio" value="여" />
            {/* input type="radio"의 경우, 태생적으로 여러 개의 입력 요소를 작성할 수밖에 없습니다. 이들 중 하나만 선택이 가능하도록 하려면 */}
            {/* 각 요소에 모두 동일한 name을 부여해야 합니다. 전송 데이터에는 선택된 요소의 value만 수집될 것입니다. */}
            <label htmlFor="gender_female">여</label>
          </p>
          <p>
            <label htmlFor="password">비밀번호: </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="off"
            />
          </p>
          <p>
            <label htmlFor="password_confirm">비밀번호 확인: </label>
            <input
              id="password_confirm"
              type="password"
              required
              autoComplete="off"
              /* 비밀번호 확인용 input에는 name을 부여하지 않았습니다. name 속성을 생략하면 해당 입력 요소의 데이터는 전송 데이터에 수집되지 않습니다. */
            />
          </p>
          <div>
            <label htmlFor="photo">프로필사진: </label>
            <input
              id="photo"
              name="photo"
              type="file"
              required
              accept="image/png, image/jpeg"
            />
            <div>
              <img alt="" />
            </div>
          </div>
          <p>
            <label htmlFor="salary">(선택) 연봉: </label>
            <DigitSeperatedInput name="salary" id="salary" /> 원
          </p>
          <p>
            <input id="agree" name="agree" type="checkbox" required />
            <label htmlFor="agree">약관에 동의합니다</label>
          </p>
        </fieldset>
      </form>
      {/* 제출(submit) 버튼은 form의 바깥에 위치시킬 수도 있는데, 그러기 위해서는 버튼의 form 속성에 form의 id를 지정해 주어야 합니다. */}
      <button type="submit" form="registerForm">
        제출
      </button>{" "}
    </>
  );
};

export default Form1;

/* e.validity
   • badInput: 지정한 type과 다른 유형의 값을 입력함
   • customError: setCustomValidity에 문자열을 설정한 경우에 true가 됨
   • patternMismatch: pattern에 지정한 정규 표현식 조건에 맞지 않음
   • rangeOverflow / rangeUnderflow: 범위 초과 / 미달
   • stepMismatch: (type=number 전용) step 속성에 지정한 간격 조건에 맞지 않음
   • tooLong / tooShort: 최대 글자 수 초과 / 최소 글자 수 미달
   • typeMismatch: (type=email, url 전용) 정해진 규칙에 어긋남
   • valueMissing: 값을 입력하지 않음
   • valid: 유효성 검증 통과 여부. 위의 모든 조건이 false일 때 true가 되며, 하나라도 true인 속성이 있으면 false가 됩니다. */

/* 상황별로 브라우저에서 미리 정의해 둔 안내 문구 대신 임의의 메시지를 보여주기 위해서는 setCustomValidity를 활용하면 됩니다.
   즉, valid와 customError를 뺀 나머지 조건 중에서 그 값이 true인 경우를 찾아내어, 이에 대한 메시지를 custom 메시지로 설정하는
   것이죠. */
