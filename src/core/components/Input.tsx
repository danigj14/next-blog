import { twMerge } from "tailwind-merge";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  const style = twMerge(
    "py-2 px-4 bg-gray-50 border border-gray-300 rounded-lg",
    className
  );

  return <input className={style} {...props} />;
}
