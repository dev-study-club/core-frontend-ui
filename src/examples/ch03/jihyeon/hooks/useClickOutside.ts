import { useCallback, useEffect, useRef } from "react";

const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLElement>(null);
  const handelClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    },
    [callback],
  );
  useEffect(() => {
    document.addEventListener("click", handelClickOutside, true);
    return () => {
      document.removeEventListener("click", handelClickOutside, true);
    };
  }, [handelClickOutside]);
  return ref;
};

export default useClickOutside;
