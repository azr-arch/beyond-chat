import { cn } from "@/utils";
import { forwardRef } from "react";

export const Input = forwardRef(
    ({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
        return (
            <input
                type={type}
                className={cn(
                    `flex h-9 w-full rounded-sm border border-neutral-300 bg-transparent 
                 px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500
         
                 `,
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";
