import NavCard from "@/components/admin/NavCard";
import NavLink from "@/components/admin/NavLink";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function AdminDashboard() {
  return (
    <div className="flex w-full h-screen">
      <nav className="flex flex-col h-full bg-gray-200 p-3">
        <NavLink icon={faFileLines} name="Posts" href="/admin/posts" />
        <NavLink icon={faGear} name="Settings" href="/admin/settings" />
      </nav>
      <main className="p-6 flex-grow h-full bg-gray-100 flex flex-col">
        <h1 className="text-3xl">Blog Admin Panel</h1>
        <p className="py-4 border-b border-gray-300">
          Welcome to the blog admin panel. You can manage your blog from here!
        </p>
        <div className="pt-4 grid grid-cols-5 gap-10 w-full">
          <NavCard
            href="/admin/posts"
            icon={faFileLines}
            text="Manage Blog Posts"
          />
          <NavCard href="/admin/posts" icon={faGear} text="Blog Settings" />
        </div>
      </main>
    </div>
  );
}
