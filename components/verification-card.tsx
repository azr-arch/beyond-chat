"use client";

import { HiMiniArrowTurnDownLeft, HiMiniArrowTurnDownRight } from "react-icons/hi2";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { cn, dummyValidationFn } from "@/utils";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";
import { motion } from "motion/react";

interface IProps {
    changeActiveForm: () => void;
}

export const VerificationCard = ({ changeActiveForm }: IProps) => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    // This could be optimized!
    const inputRefs = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
    ];

    const handleValidate = () => {
        // Dummy validation
        const values = inputRefs.map((ref) => ref.current?.value as string);
        if (!values) return; // Check for empty fields

        const res = dummyValidationFn(values);

        if (res?.success) {
            setSuccess(true);

            setTimeout(() => {
                router.push("/setup-org");
            }, 1000);
        }
        if (res?.error) {
            setError(true);
        }
    };

    return (
        <motion.div
            initial={{
                x: 100,
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            transition={{
                ease: "easeOut",
            }}
            className="w-min relative mx-auto text-primary space-y-6 border-l border-t border-gray-400 p-8 rounded-tl-2xl"
        >
            <div className="space-y-3 ">
                <div className="overflow-hidden">
                    <h4 className="text-[2rem] leading-8 text-balance">
                        Enter verification code from email
                    </h4>
                </div>
                <div>
                    <p className="text-gray-700 text-sm">Please enter the code we sent you</p>
                    <p className="text-gray-800 font-medium text-sm ">john@doe.com</p>
                </div>
            </div>

            <form
                onChange={() => {
                    if (error) {
                        setError(false);
                    }
                    if (success) {
                        setSuccess(false);
                    }
                }}
                className="w-full"
            >
                <div className="flex items-center gap-[18px] ">
                    {/* Creates 4 input fields  */}
                    {Array.from(new Array(4)).map((_, idx) => (
                        <Input
                            key={idx}
                            ref={inputRefs[idx]}
                            name={`code-${idx + 1}`}
                            maxLength={1}
                            type="text"
                            className={cn(
                                `w-12 shadow-md h-14 border-blue-200 placeholder-shown:bg-gray-300/50
                                placeholder-shown:border-transparent  text-blue-700 text-lg font-medium 
                                bg-blue-200/50  text-center focus:border-blue-500`,
                                error && "border-red-600  border-2 ",
                                success && "border-green-500 border-2"
                            )}
                            autoComplete={"off"}
                            placeholder=" "
                        />
                    ))}
                </div>

                <div className="flex flex-col items-start space-y-5 mt-7 justify-between">
                    <button
                        type="button"
                        onClick={handleValidate}
                        className="flex items-center self-end gap-x-1.5 focus:outline-none focus:underline text-blue-600 hover:text-blue-400 transition-colors "
                    >
                        {success ? (
                            <VscLoading className="animate-spin w-5 h-5" />
                        ) : (
                            <>
                                <HiMiniArrowTurnDownRight />
                                <span className="text-sm xl:text-base">Validate</span>
                            </>
                        )}
                        <span className="sr-only">Validate</span>
                    </button>

                    <button
                        type="button"
                        onClick={changeActiveForm}
                        className="flex items-center gap-x-1.5 focus:outline-none focus:underline text-gray-600 hover:text-gray-400 transition-colors "
                    >
                        <HiMiniArrowTurnDownLeft />
                        <span className="text-sm xl:text-base">Forgot something?</span>
                        <span className="sr-only">Back</span>
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
