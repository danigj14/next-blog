import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef(function TextArea(
  { className, ...props }: InputProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const style = twMerge(
    "py-2 px-4 bg-gray-50 border border-gray-300 rounded-lg",
    className
  );

  return <textarea ref={ref} className={style} {...props} />;
});
