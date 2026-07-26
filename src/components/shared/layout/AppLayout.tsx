import type { ReactNode } from "react";
import Gnb from "@/components/gnb";
import ViewportContextProvider from "@/context/viewportContext";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Gnb />
      <main>
        <ViewportContextProvider>{children}</ViewportContextProvider>
      </main>
    </>
  );
}
