import Image from "next/image";
import Link from "next/link";
import me from "/public/images/me.jpeg";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="container mx-auto py-10">
      <header className="w-full flex flex-col items-center">
        <Image className="w-32 rounded-full" src={me} alt="logo" />
        <h1 className="text-3xl my-4 font-bold">My Personal Blog</h1>
        <p>
          Welcome to my personal blog. A place where I share all kind of
          thoughts about pretty much anything that interests me!
        </p>
        <nav className="w-full flex divide-x-2 divide-gray-300 justify-center my-4 py-4">
          <Link className="px-4" href="/">
            Home
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
