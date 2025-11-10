import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="/client">Client list</Link>
        <Link href="/server">Server list</Link>
      </nav>
      <div>{children}</div>
    </>
  );
}
