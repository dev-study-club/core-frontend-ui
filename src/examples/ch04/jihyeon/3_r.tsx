import { useCallback, useRef } from "react";
import cx from "./cx";

export default function ReactiveTextBox3() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  return (
    <div className={cx("example")}>
      <h3>
        #3. React <sub>원본의 scrollHeight로 조절</sub>
      </h3>
      <div className={cx("container")}>
        <textarea
          ref={textareaRef}
          aria-label="scrollHeight 방식"
          onInput={handleInput}
        />
      </div>
    </div>
  );
}
