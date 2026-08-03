import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantStyle = variant === "primary" 
    ? "bg-violet-600 text-white hover:bg-violet-700" 
    : "bg-white/10 text-white hover:bg-white/20";

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}
