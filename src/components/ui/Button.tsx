import { ReactNode } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils";

export const buttonVariants = cva(
  "inline-flex h-10 w-fit items-center justify-center whitespace-nowrap px-5 pb-0.5 transition disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        base: "bg-stone-800 text-stone-50 hover:bg-stone-950",
        secondary: "bg-stone-600/10 hover:bg-stone-600/25",
      },
      size: {
        default: "",
        icon: "size-10 shrink-0",
        small: "h-8 w-fit text-sm px-3",
        large: "h-20 w-fit",
      },
    },
    defaultVariants: {
      variant: "base",
      size: "default",
    },
  },
);

type BaseButtonProps = VariantProps<typeof buttonVariants> & {
  children?: ReactNode;
  className?: string;
};

// Button
type ButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  onClick,
  variant = "base",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  return (
    <button
      disabled={props.disabled}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}

// ButtonLink
type ButtonLinkProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string | URL;
    underline?: boolean;
  };

export function ButtonLink({
  children,
  href,
  onClick,
  variant = "base",
  size = "default",
  underline = false,
  className = "",
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    buttonVariants({ variant, size }),
    underline &&
      "underline decoration-2 underline-offset-[3px] decoration-stone-900 hover:decoration-stone-900/0",
    className,
  );

  return (
    <Link href={href} className={classes} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
