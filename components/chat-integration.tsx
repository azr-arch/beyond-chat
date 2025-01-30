"use client";

import Link from "next/link";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CgArrowRightO } from "react-icons/cg";
import {
    HiArrowPath,
    HiChatBubbleLeftRight,
    HiCheckCircle,
    HiChevronRight,
    HiDocumentDuplicate,
    HiEnvelope,
    HiExclamationTriangle,
    HiGlobeAlt,
    HiShare,
    HiSparkles,
} from "react-icons/hi2";
import { IntegrationStatus } from "./integration-status";

export enum IntegrationStatusEnum {
    IDLE,
    PENDING,
    ERROR,
    SUCCESS,
}

export const ChatbotIntegration = () => {
    const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatusEnum>(
        IntegrationStatusEnum.IDLE
    );
    const [showIntegrationOptions, setShowIntegrationOptions] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const codeSnippet = `<script src="https://cdn.beyondchats.com/chatbot-v1.js"></script>`;

    return (
        <div className="relative w-full h-full   overflow-y-auto  mx-auto bg-white rounded-none  shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 ">
                <div className="space-y-6 ">
                    {/* Header */}
                    <div className="space-y-2 ">
                        <div className="flex items-end gap-x-1.5">
                            <Link
                                href={"setup-org"}
                                className="text-sm py-1 focus:outline-blue-400 px-2  text-neutral-400 transition-colors hover:text-blue-400"
                            >
                                <BsArrowLeft className="w-4 h-4" />
                            </Link>
                            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight leading-5">
                                Chatbot Integration
                            </h2>
                        </div>
                        <p className="text-gray-500 text-sm lg:text-base pl-10">
                            Final step to launch your AI assistant
                        </p>
                    </div>
                    <div className="h-[1px] w-full bg-gray-200" />
                    {/* Main Content */}
                    <div className="space-y-6 ">
                        {/* Top Feedback Bar */}
                        <div className="flex justify-end group">
                            <button className="text-blue-600 hover:text-blue-700  text-sm flex items-center gap-1">
                                <HiChatBubbleLeftRight className="w-4 h-4" />
                                <span className="group-hover:underline">
                                    Chatbot not working as intended? Share feedback
                                </span>
                            </button>
                        </div>

                        {/* Test Chatbot Button */}
                        <Link
                            href={"https://example.com/"}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="w-full flex flex-col  items-start p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
                        >
                            <span className="text-blue-600 font-medium">Test Chatbot</span>
                            <p className="text-sm text-gray-600 mt-0.5">Preview on your website</p>
                        </Link>

                        {/* Integration Options */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100"
                                onClick={() => setShowIntegrationOptions(!showIntegrationOptions)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-gray-800 font-medium">
                                            Integrate on Your Website
                                        </span>
                                        <p className="text-sm text-gray-600 mt-.5">
                                            Choose your integration method
                                        </p>
                                    </div>
                                    <HiChevronRight
                                        className={`w-4 h-4 transform text-primary transition-transform ${
                                            showIntegrationOptions ? "rotate-90" : ""
                                        }`}
                                    />
                                </div>
                            </button>

                            {showIntegrationOptions && (
                                <div className="p-4 space-y-6 border-t border-gray-200">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-800">
                                            Manual Integration
                                        </h4>
                                        <div className="relative">
                                            <pre className="p-4 bg-gray-100 text-gray-700  rounded-lg overflow-x-auto horizontal-scrollbar">
                                                <code>{codeSnippet}</code>
                                            </pre>
                                            <button
                                                onClick={handleCopyCode}
                                                className="absolute top-2 right-2 p-2 bg-white border  border-gray-200 rounded-lg hover:bg-gray-50"
                                            >
                                                {copied ? (
                                                    <HiCheckCircle className="w-5 h-5 text-green-600" />
                                                ) : (
                                                    <HiDocumentDuplicate className="w-5 h-5 text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Paste this code within the {"<head>"} tag of your
                                            website
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-800">
                                            Send Instructions
                                        </h4>
                                        <button className="w-full px-5 py-2 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 flex items-center gap-2">
                                            <HiEnvelope className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-800 text-sm lg:text-base">
                                                Email to Developer
                                            </span>

                                            <BsArrowRight className=" md:block ml-auto w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Test Integration Button */}
                        <button
                            onClick={() => setIntegrationStatus(IntegrationStatusEnum.PENDING)}
                            className="w-fit flex items-center gap-x-2 ml-auto  px-5 py-1.5  bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
                        >
                            Verify Integration
                            <BsArrowRight />
                        </button>

                        <IntegrationStatus
                            integrationStatus={integrationStatus}
                            setIntegrationStatus={(type) => setIntegrationStatus(type)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
