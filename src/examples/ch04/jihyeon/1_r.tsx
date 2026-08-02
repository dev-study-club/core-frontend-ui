import { useCallback, type SyntheticEvent } from "react";
import cx from "./cx";
import measureLines from "./measureLines";

export default function ReactiveTextBox1() {
  const handleInput = useCallback(
    (event: SyntheticEvent<HTMLTextAreaElement>) => {
      const textarea = event.target as HTMLTextAreaElement;
      const value = textarea.value;
      textarea.rows = measureLines(textarea, value);
    },
    [],
  );

  return (
    <div className={cx("example")}>
      <h3>
        #1. React <sub>canvas - measureText로 줄 수 측정</sub>
      </h3>
      <div className={cx("container")}>
        <textarea aria-label="canvas 측정 방식" onInput={handleInput} />
      </div>
    </div>
  );
}
