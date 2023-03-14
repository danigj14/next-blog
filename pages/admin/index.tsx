import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex w-full h-screen">
      <nav className="flex flex-col h-full bg-gray-200 p-6">
        <Link className="py-4" href="/admin/posts">Posts</Link>
        <Link href="/admin/settings">Settings</Link>
        <Link className="mt-auto"href="/">To Blog</Link>
      </nav>
      <main></main>
    </div>
  );
}
