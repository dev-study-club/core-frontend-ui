import VanillaWrapper from "@/vanillarWrapper";
import cx from "./cx";
import data from "./data";
import initViewportObserver, {
  notifyScrollInfoChanged,
  ScrollInfo,
} from "./vanilla/viewportObserver";
import { ViewportSize } from "./context/viewContext";
import getStyleInsideViewport from "./vanilla/getStyleInsideViewport";
import Observer from "./vanilla/observer";

const initator = (wrapper: HTMLDivElement) => {
  initViewportObserver();

  const $tooltips = data.map(({ id, text, description }) => {
    const $root = document.createElement("div");
    $root.classList.add(cx("anchor"));
    $root.textContent = text;

    const $details = document.createElement("details");
    $details.name = "tooltip";
    $details.classList.add(cx("details"));

    const $summary = document.createElement("summary");
    $summary.classList.add(cx("tooltip-trigger"));

    const $tooltip = document.createElement("span");
    $tooltip.classList.add(cx("tooltip-layer"));
    $tooltip.textContent = description;

    $details.append($summary, $tooltip);

    $details.addEventListener("toggle", () => {
      if ($details.open) {
        notifyScrollInfoChanged();
        return $root;
      }
    });

    const handler = (viewportSize: ViewportSize) => {
      for (const $root of $tooltips) {
        const $details = $root.querySelector(
          cx("details[open]"),
        ) as HTMLDetailsElement;
        if (!$details) continue;
        const $tooltip = $details.getElementsByClassName(
          cx("tooltip-layer"),
        )[0] as HTMLElement;
        const newStyle =
          getStyleInsideViewport($details, $tooltip, viewportSize) || "";
        $tooltip.setAttribute("style", newStyle);
      }
    };
    Observer.observe<ScrollInfo>("scrollInfo", $root, handler);
    Observer.observe<ViewportSize>("viewportSize", $root, handler);

    $root.append($details);
    return $root;
  });

  wrapper.append(...$tooltips);
};
export default function Tooltip5V() {
  return <VanillaWrapper title="#5" initiator={initator} />;
}
