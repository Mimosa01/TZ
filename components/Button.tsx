import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  className,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx("text-dark-900 font-bold py-5 px-[137px] rounded-[20px]", className)} {...props}>
      { children }
    </button>
  );
}