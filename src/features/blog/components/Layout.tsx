import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const session = useSession();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="container px-8 mx-auto">
      <nav className="flex items-center justify-between py-6">
        <Link className="z-10" href="/">
          <div className="flex items-center text-2xl gap-4">
            <FontAwesomeIcon icon={faFileLines} />
            Next Blog
          </div>
        </Link>
        <button
          className="md:hidden z-10"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          <FontAwesomeIcon
            icon={isMobileNavOpen ? faXmark : faBars}
            className="text-xl px-2 py-2"
          />
        </button>
        <div
          className={`flex md:items-center md:pb-0 md:gap-6 md:text-lg absolute ${
            isMobileNavOpen ? "top-20" : "-top-full"
          } left-0 md:static bg-gray-50 px-10 md:px-0 w-screen md:w-fit text-xl flex-col items-start gap-6 transition-all md:flex-row pb-8`}
        >
          <Link className="hover:text-gray-600 transition-all" href="/">Home</Link>
          <Link className="hover:text-gray-600 transition-all" href="/posts">Posts</Link>
          <Link className="hover:text-gray-600 transition-all" href="/tags">Tags</Link>
          {session.status === "authenticated" ? (
            <>
              <Link className="hover:text-gray-600 transition-all" href="/admin">Admin Panel</Link>
              <button className="hover:text-gray-600 transition-all" onClick={() => signOut()}>Logout (Admin)</button>
            </>
          ) : (
            <button className="hover:text-gray-600 transition-all" onClick={() => signIn()}>Login</button>
          )}
        </div>
      </nav>
      <main>{children}</main>
      <footer className="h-32"></footer>
    </div>
  );
}
