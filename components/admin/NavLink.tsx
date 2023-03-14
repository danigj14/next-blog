import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface NavLinkProps {
  icon: IconDefinition;
  name: string;
  href: string;
}

export default function NavLink({ icon, name, href }: NavLinkProps) {
  return (
    <Link
      className="px-2 py-2 hover:text-gray-900 hover:bg-gray-300 transition-all rounded-xl"
      href={href}
    >
      <FontAwesomeIcon icon={icon} size="lg" className="pr-3" fixedWidth />
      {name}
    </Link>
  );
}
