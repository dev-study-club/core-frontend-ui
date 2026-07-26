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

const ViewportContext = createContext<ViewportSize>({
  width: 0,
  height: 0,
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

  const value = useMemo(
    () => viewportSize,
    [viewportSize],
  );

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewportContext() {
  return useContext(ViewportContext);
}

