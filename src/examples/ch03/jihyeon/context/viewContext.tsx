import { createContext, useContext, useSyncExternalStore } from "react";
import { deepComare } from "../utils";

type ScrollInfo = Pick<DOMRect, "left" | "top"> & { scrollHeight: number };
const DefaultScrollInfo: ScrollInfo = { left: 0, top: 0, scrollHeight: 0 };

const getScrollInfo = (() => {
  let stored: ScrollInfo = DefaultScrollInfo;
  return () => {
    const { scrollLeft, scrollTop, scrollHeight } = document.scrollingElement!;
    const newScrollInfo = { left: scrollLeft, top: scrollTop, scrollHeight };
    if (!deepComare(stored, newScrollInfo)) stored = newScrollInfo;
    return stored;
  };
})();

const subscribeScroll = (getSnapshot: () => void) => {
  window.addEventListener("scroll", getSnapshot);
  return () => {
    window.removeEventListener("scroll", getSnapshot);
  };
};

const ScrollInfoContext = createContext<ScrollInfo>(DefaultScrollInfo);
const ScrollInfoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const scrollInfo = useSyncExternalStore(
    subscribeScroll,
    getScrollInfo,
    () => DefaultScrollInfo,
  );
  return <ScrollInfoContext value={scrollInfo}>{children}</ScrollInfoContext>;
};

const getViewportElem = (() => {
  let elem: HTMLElement | null = document.querySelector("#viewport");
  return () => {
    if (!elem) {
      elem = document.createElement("div");
      elem.id = "viewport";
      elem.style.cssText = "position: fixed; inset: 0; z-index: -1;";
      document.body.insertAdjacentElement("afterbegin", elem);
    }
    return elem;
  };
})();

export type ViewportSize = Pick<DOMRect, "width" | "height">;
const DefaultViewportSize: ViewportSize = { width: 0, height: 0 };

const getViewportSize = (() => {
  let stored: ViewportSize = DefaultViewportSize;
  return () => {
    const { clientWidth, clientHeight } = getViewportElem();
    const newSize = { width: clientWidth, height: clientHeight };
    if (!deepComare(stored, newSize)) stored = newSize;
    return stored;
  };
})();

const subscribeResize = (getSnapshot: () => void) => {
  const callback = () => window.requestAnimationFrame(getSnapshot);
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(getViewportElem());
  return () => {
    resizeObserver.disconnect();
  };
};

const ViewportSizeContext = createContext<ViewportSize>(DefaultViewportSize);
const ViewportSizeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const viewportSize = useSyncExternalStore(
    subscribeResize,
    getViewportSize,
    () => DefaultViewportSize,
  );
  return (
    <ViewportSizeContext value={viewportSize}>{children}</ViewportSizeContext>
  );
};

const ViewportContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ScrollInfoContextProvider>
    <ViewportSizeContextProvider>{children}</ViewportSizeContextProvider>
  </ScrollInfoContextProvider>
);

export default ViewportContextProvider;
export const useScrollInfo = () => useContext(ScrollInfoContext);
export const useViewportSize = () => useContext(ViewportSizeContext);
