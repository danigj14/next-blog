import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface NavLinkProps {
  children?: React.ReactNode;
  href: string;
}

export default function NavLink({ children, href }: NavLinkProps) {
  return (
    <Link
      className="py-2 hover:bg-gray-200 transition-all rounded-xl"
      href={href}
    >
      {children}
    </Link>
  );
}
