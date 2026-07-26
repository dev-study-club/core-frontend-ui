import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand-link">
          <BookOpen aria-hidden="true" size={22} />
          <span>Core Frontend UI</span>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}

