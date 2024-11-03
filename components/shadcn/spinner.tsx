import * as React from "react";
import { cn } from "@hhs/utils/cn";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string; // Size of the spinner, e.g., "h-5 w-5"
  className?: string; // Additional classes
}

const Spinner: React.FC<SpinnerProps> = ({ size = "h-5 w-5", className, ...props }) => (
  <div
    className={cn(
      "animate-spin rounded-full border-2 border-transparent border-t-current",
      size,
      className
    )}
    {...props}
  />
);

export { Spinner };
