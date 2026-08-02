import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ViewportSize {
  width: number;
  height: number;
}

interface ScrollInfo {
  top: number;
  left: number;
}

const ViewportSizeContext = createContext<ViewportSize>({
  width: 0,
  height: 0,
});

const ScrollInfoContext = createContext<ScrollInfo>({
  top: 0,
  left: 0,
});

interface ViewportContextProviderProps {
  children: ReactNode;
}

export default function ViewportContextProvider({
  children,
}: ViewportContextProviderProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>(() => ({
    top: window.scrollY,
    left: window.scrollX,
  }));

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollInfo({
        top: window.scrollY,
        left: window.scrollX,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const viewportValue = useMemo(
    () => viewportSize,
    [viewportSize],
  );
  const scrollValue = useMemo(() => scrollInfo, [scrollInfo]);

  return (
    <ViewportSizeContext.Provider value={viewportValue}>
      <ScrollInfoContext.Provider value={scrollValue}>
        {children}
      </ScrollInfoContext.Provider>
    </ViewportSizeContext.Provider>
  );
}

export function useViewportContext() {
  return useViewportSize();
}

export function useViewportSize() {
  return useContext(ViewportSizeContext);
}

export function useScrollInfo() {
  return useContext(ScrollInfoContext);
}
