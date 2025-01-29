import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "#020817",
                main: "#eff2f6",
            },
            backgroundColor: {
                main: "#eff2f6",
            },
            boxShadow: {
                border: " 0 0px 2px 1px rgb(0 0 0 / 0.1)",
            },
        },
    },
    plugins: [],
} satisfies Config;
