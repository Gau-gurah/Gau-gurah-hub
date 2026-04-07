import { Header } from "./header";

export function PlatformShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full overflow-auto">{children}</main>
    </>
  );
}
