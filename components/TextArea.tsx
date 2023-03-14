import { twMerge } from "tailwind-merge";

type InputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({className, ...props}: InputProps) {
  const style = twMerge("py-2 px-4 bg-gray-100 border border-gray-300 rounded-lg", className);

  return <textarea className={style} {...props} />;
}