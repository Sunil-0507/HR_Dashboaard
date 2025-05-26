import { HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        className={twMerge(
          clsx(
            "rounded-lg bg-white p-6 shadow-sm",
            {
              "border border-gray-200": variant === "bordered",
            },
            className
          )
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
