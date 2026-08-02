import { deepCompare } from "@/service/util";
import Observer from "./observer";

export type ScrollInfo = Pick<DOMRect, "left" | "top" | "width" | "height"> & {
  scrollHeight: number;
};

const defaultScrollInfo: ScrollInfo = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};

const getScrollInfo = (() => {
  let stored: ScrollInfo = defaultScrollInfo;

  return () => {
    const {
      clientWidth,
      clientHeight,
      scrollLeft,
      scrollTop,
      scrollHeight,
    } = document.scrollingElement!;
    const nextScrollInfo = {
      left: scrollLeft,
      top: scrollTop,
      width: clientWidth,
      height: clientHeight,
      scrollHeight,
    };

    if (!deepCompare(stored, nextScrollInfo)) {
      stored = nextScrollInfo;
    }

    return stored;
  };
})();

export function notifyScrollInfoChanged() {
  Observer.notify("scrollInfo", getScrollInfo());
}

const getViewportElem = (() => {
  let elem: HTMLElement | null = null;

  return () => {
    if (!elem) {
      elem = document.querySelector("#viewport");

      if (!elem) {
        elem = document.createElement("div");
        elem.id = "viewport";
        elem.style.cssText = "position: fixed; inset: 0; z-index: -1;";
        document.body.insertAdjacentElement("afterbegin", elem);
      }
    }

    return elem;
  };
})();

export type ViewportSize = Pick<DOMRect, "width" | "height">;

const defaultViewportSize: ViewportSize = {
  width: 0,
  height: 0,
};

const getViewportSize = (() => {
  let stored: ViewportSize = defaultViewportSize;

  return () => {
    const { clientWidth, clientHeight } = getViewportElem();
    const nextSize = {
      width: clientWidth,
      height: clientHeight,
    };

    if (!deepCompare(stored, nextSize)) {
      stored = nextSize;
    }

    return stored;
  };
})();

export function notifyViewportSizeChanged() {
  Observer.notify("viewportSize", getViewportSize());
}

export default function initViewportObserver() {
  window.addEventListener("scroll", notifyScrollInfoChanged);

  const resizeObserver = new ResizeObserver(notifyViewportSizeChanged);
  resizeObserver.observe(getViewportElem());
}

