import { ViewportSize } from "./viewportObserver";

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

const getStyleInsideViewport = (
  $root: HTMLElement,
  $target: HTMLElement,
  viewportSize: ViewportSize,
) => {
  if (!$root || !$target) return;
  const { width: vw, height: vh } = viewportSize;

  const rootRect = $root.getBoundingClientRect();
  const targetRect = $target.getBoundingClientRect();
  const horizontal = rootRect.right + targetRect.width < vw ? "left" : "right";
  const vertical = rootRect.bottom + targetRect.height < vh ? "top" : "bottom";
  const oppositeHorizontal = OppositePositionKeys[horizontal];
  const oppositeVertical = OppositePositionKeys[vertical];
  return `
  ${horizontal}: ${PositionStyle[horizontal]};
  ${vertical}: ${PositionStyle[vertical]};
  ${oppositeHorizontal}: auto;
  ${oppositeVertical}: auto;
  `;
};

export default getStyleInsideViewport;
