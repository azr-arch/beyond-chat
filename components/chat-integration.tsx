"use client";

import { useState } from "react";
import {
    HiChatBubbleLeftRight,
    HiCheckCircle,
    HiChevronRight,
    HiDocumentDuplicate,
    HiEnvelope,
} from "react-icons/hi2";
import { IntegrationStatus } from "./integration-status";
import { AnimatePresence, motion } from "motion/react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export enum IntegrationStatusEnum {
    IDLE,
    PENDING,
    ERROR,
    SUCCESS,
}

export const ChatbotIntegration = () => {
    const [showIntegrationOptions, setShowIntegrationOptions] = useState(false);
    const [copied, setCopied] = useState(false);
    const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatusEnum>(
        IntegrationStatusEnum.IDLE
    );
    const [showConfetti, setShowConfetti] = useState(false);

    const codeSnippet = `<script src="https://cdn.beyondchats.com/chatbot-v1.js"></script>`;

    const handleCopyCode = () => {
        navigator.clipboard.writeText(codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTestChatbot = () => {
        window.open("https://example.com", "_blank");
        setIntegrationStatus(IntegrationStatusEnum.SUCCESS);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    };

    return (
        <motion.div className="h-full flex items-center justify-center bg-gray-100 w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            >
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-neutral-300 pb-4 mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-primary tracking-tighter">
                                Chatbot Integration
                            </h1>
                            <p className="text-sm text-gray-500">
                                Final step to launch your AI assistant
                            </p>
                        </div>
                        <button
                            className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                            onClick={() => alert("Feedback system not implemented")}
                        >
                            <HiChatBubbleLeftRight className="w-5 h-5" />
                            Share Feedback
                        </button>
                    </div>

                    {/* Test Chatbot Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleTestChatbot}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
                    >
                        Test Chatbot
                    </motion.button>

                    {/* Integration Options */}
                    <motion.div className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            className="w-full p-4 text-left bg-gray-100 hover:bg-gray-200 transition-colors"
                            onClick={() => setShowIntegrationOptions(!showIntegrationOptions)}
                        >
                            <div className="flex justify-between items-center text-gray-700">
                                <span>Integrate on Your Website</span>
                                <HiChevronRight
                                    className={`transform transition-transform ${
                                        showIntegrationOptions ? "rotate-90" : ""
                                    }`}
                                />
                            </div>
                        </button>
                        <div className="overflow-hidden">
                            <AnimatePresence>
                                {showIntegrationOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, y: "-100%" }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: "-100%" }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="p-4 space-y-4"
                                        layout
                                    >
                                        {/* Manual Integration */}
                                        <div>
                                            <h4 className="text-sm font-medium mb-2 text-gray-500">
                                                Manual Integration
                                            </h4>
                                            <pre className="bg-gray-100 p-2 rounded-md text-gray-500 overflow-x-auto horizontal-scrollbar">
                                                <code>{codeSnippet}</code>
                                            </pre>
                                            <button
                                                onClick={handleCopyCode}
                                                className="bg-gray-200 p-2 text-sm gap-2 text-gray-600 rounded-md inline-flex items-center mt-1"
                                            >
                                                {copied ? (
                                                    <HiCheckCircle className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <HiDocumentDuplicate className="w-5 h-5" />
                                                )}
                                                {copied ? "Copied!" : "Copy Code"}
                                            </button>
                                        </div>

                                        {/* Email to Developer */}
                                        <div>
                                            <a
                                                href={`mailto:developer@client.com?subject=Chatbot%20Integration&body=${encodeURIComponent(
                                                    codeSnippet
                                                )}`}
                                                className="bg-gray-200 p-2 text-gray-600 rounded-md flex items-center justify-between hover:bg-gray-300 transition-colors"
                                            >
                                                <div className="flex items-center">
                                                    <HiEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                                                    Email to Developer
                                                </div>
                                                <HiChevronRight className="text-gray-500" />
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Verify Integration Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIntegrationStatus(IntegrationStatusEnum.PENDING)}
                        className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md mt-4 transition-colors"
                    >
                        Verify Integration
                    </motion.button>

                    {/* Integration Status */}
                    <AnimatePresence mode="wait">
                        <IntegrationStatus
                            integrationStatus={integrationStatus}
                            setIntegrationStatus={(type) => {
                                setIntegrationStatus(type);
                            }}
                        />
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Confetti Animation */}
            {showConfetti && (
                <Fireworks
                    autorun={{ speed: 3, duration: 5000 }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 9999,
                    }}
                />
            )}
        </motion.div>
    );
};
