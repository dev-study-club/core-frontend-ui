import { useCallback, useRef } from "react";
import cx from "./cx";

export default function ReactiveTextBox2() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const replicaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;
    const replica = replicaRef.current;
    if (!textarea || !replica) return;
    replica.value = textarea.value;
    textarea.style.height = `${replica.scrollHeight}px`;
  }, []);

  return (
    <div className={cx("example")}>
      <h3>
        #2. React <sub>Replica 기법</sub>
      </h3>
      <div className={cx("container")}>
        <textarea
          ref={replicaRef}
          className={cx("replica")}
          aria-hidden="true"
          tabIndex={-1}
          readOnly
        />
        <textarea
          ref={textareaRef}
          aria-label="Replica 방식"
          onInput={handleInput}
        />
      </div>
    </div>
  );
}
