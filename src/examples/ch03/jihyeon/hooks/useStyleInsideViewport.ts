import { type RefObject, useLayoutEffect, useRef, useState } from "react";
import { useScrollInfo, useViewportSize } from "../context/viewContext";
import { deepComare } from "../utils";

type PositionKey = "left" | "top" | "right" | "bottom";
type PositionStyleType = Partial<Record<PositionKey, string | number>>;
const OppositePositionKeys = {
  left: "right",
  top: "bottom",
  right: "left",
  bottom: "top",
} as const;
const PositionStyle = {
  left: "100%",
  top: "100%",
  right: "100%",
  bottom: "100%",
};

const useStyleInsideViewport = (
  rootRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
) => {
  const { top: vt, left: vl } = useScrollInfo();
  const { width: vw, height: vh } = useViewportSize();
  const stored = useRef({});
  const [style, setStyle] = useState<PositionStyleType | undefined>(undefined);

  useLayoutEffect(() => {
    const newInfo = { vt, vl, vw, vh };
    if (
      !rootRef.current ||
      !targetRef.current ||
      deepComare(newInfo, stored.current)
    )
      return;

    stored.current = newInfo;
    const rootRect = rootRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();
    const horizontal =
      rootRect.right + targetRect.width < vw ? "left" : "right";
    const vertical =
      rootRect.bottom + targetRect.height < vh ? "top" : "bottom";
    const oppositeHorizontal = OppositePositionKeys[horizontal];
    const oppositeVertical = OppositePositionKeys[vertical];
    setStyle({
      [horizontal]: PositionStyle[horizontal],
      [vertical]: PositionStyle[vertical],
      [oppositeHorizontal]: "auto",
      [oppositeVertical]: "auto",
    });
  }, [rootRef, targetRef, vt, vl, vw, vh]);

  return style;
};

export default useStyleInsideViewport;
