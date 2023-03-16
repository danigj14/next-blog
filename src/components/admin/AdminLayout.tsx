import {  } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket, faFileLines, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLink from "./NavLink";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex w-full h-screen">
      <nav className="flex flex-col h-full bg-gray-100 px-4">
        <span className="text-center text-2xl border-b border-gray-300 px-10 py-4">
          Blog Admin Panel
        </span>
        <div className="flex flex-col gap-1 py-2">
          <NavLink href="/admin">
            <FontAwesomeIcon
              icon={faHome}
              className="text-gray-900 px-4"
              fixedWidth
            />
            Dashboard
          </NavLink>
          <NavLink href="/admin/posts">
            <FontAwesomeIcon
              icon={faFileLines}
              className="text-blue-500 px-4"
              fixedWidth
            />
            Posts
          </NavLink>
        </div>
        <div className="flex flex-col gap-1 border-t border-gray-300 py-2">
        <NavLink href="/">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-green-600 px-4"
              fixedWidth
            />
            Go to Blog
          </NavLink>
        </div>
      </nav>
      <main className="p-6 flex-grow h-full bg-gray-50 flex flex-col">
        {children}
      </main>
    </div>
  );
}
