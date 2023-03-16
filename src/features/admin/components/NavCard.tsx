import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface NavCardProps {
  href: string;
  icon: IconDefinition;
  text: string;
}

export default function NavCard({ href, icon, text }: NavCardProps) {
  return (
    <Link
      className="p-4 bg-gray-200 hover:scale-105 shadow rounded-xl flex flex-col items-center transition-all"
      href={href}
    >
      <FontAwesomeIcon className="pb-4" icon={icon} size="5x" />
      <span className="text-xl text-center font-bold">{text}</span>
    </Link>
  );
}
