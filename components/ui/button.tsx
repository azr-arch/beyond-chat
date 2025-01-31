import { cn } from "@/utils";

export const Button = ({
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
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
