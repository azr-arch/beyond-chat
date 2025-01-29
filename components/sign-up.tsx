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

export const SignUp = () => {
    const [activeForm, setActiveForm] = useState<"step-1" | "step-2">("step-2");

    return (
        <div className="w-full flex flex-col gap-6">
            {activeForm === "step-1" ? (
                <div className="w-full max-w-md mx-auto p-8 border-gray-400 border-l border-t rounded-tl-2xl">
                    <Link
                        href={"/"}
                        className="justify-center mb-5 text-center self-center text-primary flex items-center font-medium gap-x-2"
                    >
                        <div className="flex w-10 h-10 items-center justify-center relative">
                            <Image src="/logo.png" alt="BeyondChats" fill className="invert" />
                        </div>
                    </Link>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Create Your Account
                        </h2>
                        <p className="text-gray-600 ">Start your 14-day free trial</p>
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setActiveForm("step-2");
                        }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                label="Name"
                                placeholder="Enter your name"
                                type="text"
                                icon={<HiUser className="text-gray-400" />}
                            />
                            <FormField
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                icon={<HiMail className="text-gray-400" />}
                            />
                            <FormField
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                icon={<HiLockClosed className="text-gray-400" />}
                            />
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/75 rounded-lg font-medium transition-colors">
                            Continue
                        </Button>

                        <div className="relative flex items-center my-6">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-sm">
                                Or continue with
                            </span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <Button className=" w-full shadow-border py-2 bg-white border border-gray-200 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2">
                            <FcGoogle className="text-xl" />
                            Google
                        </Button>
                    </form>
                </div>
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
    icon: ReactNode;
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
                className=" w-full pl-10 pr-4 py-3 border text-primary border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
        </div>
    </div>
);
