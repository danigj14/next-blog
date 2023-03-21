import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

enum Colors {
  blue = "bg-blue-600 hover:bg-blue-700 text-gray-50",
  green = "bg-green-600 hover:bg-green-700 text-gray-50",
  red = "bg-red-600 hover:bg-red-700 text-gray-50",
}

type ButtonProps = (
  | (LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | React.ButtonHTMLAttributes<HTMLButtonElement>
) & { color?: keyof typeof Colors };

export function Button({ color = "blue", className, ...props }: ButtonProps) {
  const style = twMerge(
    "text-sm font-bold px-4 py-2 rounded-xl transition-all",
    Colors[color],
    className
  );

  if ("href" in props) return <Link className={style} {...props} />;

  return <button className={style} {...props} />;
}
