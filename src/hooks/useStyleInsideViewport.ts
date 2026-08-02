import { useScrollInfo, useViewportSize } from "@/context/viewportContext";
import { deepCompare } from "@/service/util";
import { type RefObject, useLayoutEffect, useRef, useState } from "react";

type PositionKey = "left" | "top" | "right" | "bottom";

export type PositionStyleType = Partial<Record<PositionKey, string | number>>;

const oppositePositionKeys = {
  left: "right",
  top: "bottom",
  right: "left",
  bottom: "top",
} as const;

export default function useStyleInsideViewport(
  rootRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  positionStyle?: PositionStyleType,
  positionType: "relative" | "absolute" = "relative",
  needUpdate = true,
) {
  const { top: viewportTop, left: viewportLeft } = useScrollInfo();
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const stored = useRef({});
  const [style, setStyle] = useState<PositionStyleType | undefined>(undefined);

  useLayoutEffect(() => {
    const nextViewportInfo = {
      top: viewportTop,
      left: viewportLeft,
      width: viewportWidth,
      height: viewportHeight,
    };

    if (
      !needUpdate ||
      !rootRef.current ||
      !targetRef.current ||
      deepCompare(nextViewportInfo, stored.current)
    ) {
      return;
    }

    stored.current = nextViewportInfo;

    const rootRect = rootRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();
    const horizontal =
      rootRect.right + targetRect.width < viewportWidth ? "left" : "right";
    const vertical =
      rootRect.bottom + targetRect.height < viewportHeight ? "top" : "bottom";
    const oppositeHorizontal = oppositePositionKeys[horizontal];
    const oppositeVertical = oppositePositionKeys[vertical];

    if (positionType === "relative") {
      setStyle({
        [horizontal]:
          positionStyle && horizontal in positionStyle
            ? positionStyle[horizontal]
            : "100%",
        [vertical]:
          positionStyle && vertical in positionStyle
            ? positionStyle[vertical]
            : "100%",
        [oppositeHorizontal]: "auto",
        [oppositeVertical]: "auto",
      });
      return;
    }

    setStyle({
      [horizontal]:
        Number(positionStyle?.[horizontal] || 0) +
        (horizontal === "left"
          ? viewportLeft + rootRect.left
          : -1 * (viewportLeft + rootRect.right - viewportWidth)),
      [vertical]:
        Number(positionStyle?.[vertical] || 0) +
        (vertical === "top"
          ? viewportTop + rootRect.top
          : -1 * (viewportTop + rootRect.bottom - viewportHeight)),
      [oppositeHorizontal]: "auto",
      [oppositeVertical]: "auto",
    });
  }, [
    needUpdate,
    positionStyle,
    positionType,
    rootRef,
    targetRef,
    viewportHeight,
    viewportLeft,
    viewportTop,
    viewportWidth,
  ]);

  return style;
}

