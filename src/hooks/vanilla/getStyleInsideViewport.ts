import type { ViewportSize } from "@/context/vanilla/viewportObserver";

type PositionKey = "left" | "top" | "right" | "bottom";

const oppositePositionKeys = {
  left: "right",
  top: "bottom",
  right: "left",
  bottom: "top",
} as const;

const positionStyle: Record<PositionKey, string> = {
  left: "100%",
  top: "100%",
  right: "100%",
  bottom: "100%",
};

export default function getStyleInsideViewport(
  root: HTMLElement,
  target: HTMLElement,
  viewportSize: ViewportSize,
) {
  if (!root || !target) {
    return undefined;
  }

  const { width: viewportWidth, height: viewportHeight } = viewportSize;
  const rootRect = root.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const horizontal =
    rootRect.right + targetRect.width < viewportWidth ? "right" : "left";
  const vertical =
    rootRect.bottom + targetRect.height < viewportHeight ? "bottom" : "top";

  return `
    ${horizontal}: auto;
    ${vertical}: auto;
    ${oppositePositionKeys[horizontal]}: ${positionStyle[horizontal]};
    ${oppositePositionKeys[vertical]}: ${positionStyle[vertical]};
  `;
}

