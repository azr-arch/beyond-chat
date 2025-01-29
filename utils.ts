import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// This is a dummy validation function
// Returns success if all items are same
export const dummyValidationFn = (values: string[]) => {
    const allSame = values.every((code) => code === values[0]);

    if (allSame) {
        return {
            success: true,
        };
    }
    return {
        error: true,
    };
    // Else return false
};
