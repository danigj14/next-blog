import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(function Input(
  { className, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const style = twMerge(
    "py-2 px-4 bg-gray-50 border border-gray-300 rounded-lg",
    className
  );

  return <input ref={ref} className={style} {...props} />;
});
