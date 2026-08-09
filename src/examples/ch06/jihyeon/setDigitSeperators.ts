// 나라마다 숫자 사이에 구분 기호를 넣는 위치도, 사용하는 기호도 제각각입니다. 예를 들어,
// 스위스는 세 자릿수마다 작은따옴표(‘)를 사용하고, 프랑스는 띄어쓰기를 사용합니다. 어떤 나라는
// 정수는 구분 기호 없이 모두 붙여 쓰고, 소수점을 표기할 때는 마침표(.) 대신 쉼표(,)를 사용하기도
// 합니다. 우리나라는 국제 표준인 세 자릿수마다 쉼표(,)로 구분하는 방식을 따릅니다.

// 자바스크립트는 ES2021에서 숫자 사이에 구분 기호를 넣는 방법(numeric separator)이 추가되었습니다.
// 숫자 리터럴을 입력할 때 세 자릿수마다 밑줄(_)을 입력해도 입력하지 않은 것과 동일하게 동작합니다. 그러나 출력 결과에까지 구분 기호가 포함되지는
// 않습니다.
// const num1 = 12345678
// const num2 = 12_345_678
// console.log(num1 === num2, num2) // true 12345678

const setDigitSeperators1 = (num: number) => {
  if (num === 0) return "0";
  let _num = num;
  const res: string[] = [];
  while (_num) {
    res.unshift(String(_num % 1000).padStart(3, "0"));
    _num = Math.floor(_num / 1000);
  }
  if (res.length > 0) {
    res[0] = res[0].replace(/^0+/, "") || "0";
  }
  return res.join(",");
};
setDigitSeperators1(12345678); // "12,345,678"
const num1 = 12345678;
const num2 = 12_345_678;
console.log(num1 === num2, num2); // true 12345678

const setDigitSeperators2 = (num: number) =>
  String(num)
    .split("")
    .reduce((acc, c, i) => `${c}${i % 3 === 0 ? "," : ""}${acc}`, "");
console.log(setDigitSeperators2(12345678)); // "12,345,678"

const setDigitSeperators3 = (num: number) =>
  String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
console.log(setDigitSeperators3(12345678)); // "12,345,678"

const setDigitSeperators4 = (num: number) => (num: Number) =>
  num.toLocaleString();
console.log(setDigitSeperators4(12345678)); // "12,345,678"
