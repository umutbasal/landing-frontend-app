import * as React from "react";
import { cn } from "@hhs/utils/cn";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "size-4",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-transparent border-t-current",
        size,
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export { Loader };
