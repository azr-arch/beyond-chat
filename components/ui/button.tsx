import { cn } from "@/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...props }: ButtonProps) => {
    return (
        <button
            className={cn(
                `
                h-8 text-center  w-full rounded-md  text-sm   
                transition-colors text-white focus:outline-none
            `,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
