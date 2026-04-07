"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@gau-gurah/ui";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/solutions", label: "Solutions" },
  { href: "/settings", label: "Settings" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl dark:bg-[#0a0a0a]/88"
      style={{ boxShadow: "var(--shadow-ring)" }}
    >
      <div className="mx-auto flex h-[48px] max-w-[1200px] items-center gap-6 px-10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[var(--black)] transition-[border-radius] duration-300 ease-out group-hover:rounded-[10px]">
            <span className="text-[10px] font-semibold leading-none text-[var(--white)]">
              G
            </span>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.5px] text-[var(--black)]">
            Gau-gurah
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex gap-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-150",
                  isActive
                    ? "text-[var(--black)]"
                    : "text-[var(--gray-500)] hover:text-[var(--black)] hover:bg-[var(--gray-50)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search Trigger */}
        <button
          type="button"
          className="flex w-[220px] items-center gap-2 rounded-md px-3.5 py-1.5 text-xs transition-shadow duration-200"
          style={{ boxShadow: "var(--shadow-ring-light)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "var(--shadow-ring)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "var(--shadow-ring-light)")
          }
          onClick={() =>
            document.dispatchEvent(new CustomEvent("open-command-palette"))
          }
        >
          <Search className="h-3.5 w-3.5 text-[var(--gray-400)]" />
          <span className="flex-1 text-left text-[12px] text-[var(--gray-400)]">
            Search solutions...
          </span>
          <kbd
            className="rounded px-1.5 py-0.5 text-[10px] text-[var(--gray-400)]"
            style={{ boxShadow: "var(--shadow-ring-light)" }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Avatar */}
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-[var(--gray-500)] cursor-pointer transition-shadow duration-200"
          style={{ boxShadow: "var(--shadow-ring-light)" }}
        >
          K
        </div>
      </div>
    </header>
  );
}
