export default function measureLines(element: HTMLElement, text: string) {
  if (!text) return 1;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context || !element.clientWidth) return 1;

  const style = window.getComputedStyle(element);
  context.font = style.getPropertyValue("font");
  context.letterSpacing = style.getPropertyValue("letter-spacing");

  return text
    .split("\n")
    .reduce(
      (lines, line) =>
        lines +
        Math.max(
          Math.ceil(context.measureText(line).width / element.clientWidth),
          1,
        ),
      0,
    );
}
