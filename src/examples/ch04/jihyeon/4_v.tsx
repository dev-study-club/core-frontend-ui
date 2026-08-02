import VanillaWrapper from "@/vanillarWrapper";
import cx from "./cx";
import measureLines from "./measureLines";

const initiator = (wrapper: HTMLDivElement) => {
  const $textarea = document.createElement("textarea");
  $textarea.setAttribute("aria-label", "Vanilla 방식");
  $textarea.addEventListener("input", () => {
    $textarea.rows = measureLines($textarea, $textarea.value);
  });
  const $container = document.createElement("div");
  $container.classList.add(cx("container"));
  $container.append($textarea);
  wrapper.append($container);
};

export default function ReactiveTextBox4V() {
  return <VanillaWrapper title="#4" initiator={initiator} />;
}
