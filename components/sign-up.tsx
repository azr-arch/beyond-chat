"use client";

import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { VerificationCard } from "./verification-card";
import { HiLockClosed, HiUser } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";

import { motion } from "motion/react";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeIn" } },
};

const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: index * 0.2, duration: 0.4, ease: "easeOut" },
    }),
};

export const SignUp = () => {
    const [activeForm, setActiveForm] = useState<"step-1" | "step-2">("step-1");

    return (
        <div className="w-full flex flex-col gap-6">
            {activeForm === "step-1" ? (
                <motion.div
                    key={activeForm}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full sm:max-w-md mx-auto p-8 border-gray-400 sm:border-l sm:border-t rounded-tl-2xl"
                >
                    <>
                        <Link
                            href={"/"}
                            className="justify-center mb-5 text-center self-center text-primary flex items-center font-medium gap-x-2"
                        >
                            <motion.div variants={logoVariants} initial="hidden" animate="visible">
                                <div className="flex w-10 h-10 items-center justify-center relative">
                                    <Image
                                        src="/logo.png"
                                        alt="BeyondChats"
                                        fill
                                        className="invert"
                                    />
                                </div>
                            </motion.div>
                        </Link>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-center mb-8"
                        >
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Create Your Account
                            </h2>
                            <p className="text-gray-600 text-sm">Start your 14-day free trial</p>
                        </motion.div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setActiveForm("step-2");
                            }}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                {[
                                    {
                                        label: "Name",
                                        placeholder: "Enter your name",
                                        type: "text",
                                        icon: <HiUser />,
                                    },
                                    {
                                        label: "Email",
                                        placeholder: "Enter your email",
                                        type: "email",
                                        icon: <HiMail />,
                                    },
                                    {
                                        label: "Password",
                                        placeholder: "Enter your password",
                                        type: "password",
                                        icon: <HiLockClosed />,
                                    },
                                ].map((field, index) => (
                                    <motion.div
                                        key={field.label}
                                        custom={index}
                                        variants={fieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <FormField {...field} />
                                    </motion.div>
                                ))}
                            </div>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <Button className="w-full bg-primary hover:bg-primary/75 rounded-lg font-medium transition-colors">
                                    Continue
                                </Button>
                            </motion.div>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="relative flex items-center my-6"
                            >
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink mx-4 text-gray-400 text-sm">
                                    Or continue with
                                </span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </motion.div>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <Button
                                    type="button"
                                    onClick={() => setActiveForm("step-2")}
                                    className="w-full shadow-border py-2 bg-white border border-gray-200 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    <FcGoogle className="text-xl" />
                                    Google
                                </Button>
                            </motion.div>
                        </form>
                    </>
                </motion.div>
            ) : (
                <VerificationCard changeActiveForm={() => setActiveForm("step-1")} />
            )}
        </div>
    );
};

// Reusable Form Field Component
export const FormField = ({
    label,
    placeholder,
    type,
    icon,
}: {
    label: string;
    placeholder: string;
    type: string;
    icon: React.ReactNode;
}) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="relative shadow-border rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <Input
                type={type}
                placeholder={placeholder}
                required
                className="w-full pl-10 pr-4 py-3 border text-primary border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
        </div>
    </div>
);
