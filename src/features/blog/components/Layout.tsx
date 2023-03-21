import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const session = useSession();

  const router = useRouter();

  return (
    <div className="container px-8 mx-auto">
      <nav className="flex justify-between px-16 py-6">
        <Link href="/">
          <div className="flex items-center text-3xl gap-4">
            <FontAwesomeIcon icon={faFileLines} className="text-4xl" />
            Next Blog
          </div>
        </Link>
        <ul className="flex gap-8 text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/tags">Tags</Link>
          </li>
          {session.data ? (
            <>
              <li>
                <Link href="/admin">Admin Panel</Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout (Admin)</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => signIn()}>Login</button>
            </li>
          )}
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
