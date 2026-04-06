import { useId } from "react";
import clsx from "clsx";
import CheckIcon from "./Icons/CheckIcon";


type CheckboxProps = Omit<React.ComponentProps<"input">, "type"> & {
  children?: React.ReactNode;
};

export default function Checkbox({
  children,
  className,
  id,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        "inline-flex cursor-pointer items-start gap-2.5 select-none",
        className,
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        className="peer sr-only"
        {...props}
      />
      <span
        className={clsx(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-dark-600 bg-transparent",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
          "[&>span]:opacity-0 peer-checked:[&>span]:opacity-100 [&>span]:transition-opacity [&>span]:duration-150",
        )}
        aria-hidden
      >
        <span className="flex origin-center scale-[0.72] items-center justify-center">
          <CheckIcon />
        </span>
      </span>
      {children != null ? (
        <span className="text-base text-default leading-snug">{children}</span>
      ) : null}
    </label>
  );
}
