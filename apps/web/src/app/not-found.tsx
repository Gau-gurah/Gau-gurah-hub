import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center px-10 min-h-[60vh]">
      <h1 className="text-[32px] font-semibold leading-[1.25] tracking-[-1.28px]">
        Page Not Found
      </h1>
      <p className="mt-2 text-[14px] text-[var(--gray-600)]">
        요청한 페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-[var(--black)] px-4 py-2 text-[14px] font-medium text-[var(--white)] transition-opacity hover:opacity-85"
      >
        Go to Overview
      </Link>
    </div>
  );
}
