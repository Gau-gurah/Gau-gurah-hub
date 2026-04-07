"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@gau-gurah/ui";
import { solutions, getCategoryById } from "@/config";
import { DynamicIcon } from "@/config";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("open-command-palette", handleOpen);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("open-command-palette", handleOpen);
    };
  }, [handleOpen]);

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Solutions">
          {solutions.map((s) => {
            const category = getCategoryById(s.category);
            return (
              <CommandItem
                key={s.id}
                value={s.name}
                onSelect={() =>
                  runCommand(() => router.push(`/solutions/${s.slug}`))
                }
              >
                <DynamicIcon name={s.icon} className="mr-2 h-4 w-4" />
                <span>{s.name}</span>
                {category && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {category.name}
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading="Pages">
          <CommandItem
            value="Overview"
            onSelect={() => runCommand(() => router.push("/"))}
          >
            Overview
          </CommandItem>
          <CommandItem
            value="Solutions"
            onSelect={() => runCommand(() => router.push("/solutions"))}
          >
            Solutions
          </CommandItem>
          <CommandItem
            value="Settings"
            onSelect={() => runCommand(() => router.push("/settings"))}
          >
            Settings
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem
            value="Toggle Theme"
            onSelect={() =>
              runCommand(() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark"),
              )
            }
          >
            Toggle Theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
