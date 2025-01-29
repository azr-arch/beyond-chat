import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, type, ...props }: InputProps) => {
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
};
