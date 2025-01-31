"use client";

import { IntegrationStatusEnum } from "./chat-integration";

import { useState, useEffect } from "react";
import {
    HiSparkles,
    HiExclamationTriangle,
    HiArrowPath,
    HiGlobeAlt,
    HiShare,
} from "react-icons/hi2";
import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";

export const IntegrationStatus = ({
    integrationStatus,
    setIntegrationStatus,
}: {
    integrationStatus: IntegrationStatusEnum;
    setIntegrationStatus: (status: IntegrationStatusEnum.IDLE) => void;
}) => {
    const [showSocial, setShowSocial] = useState(false);

    useEffect(() => {
        if (integrationStatus === IntegrationStatusEnum.SUCCESS) {
            setTimeout(() => setShowSocial(true), 2000); // Delay social buttons appearance
        }
    }, [integrationStatus]);

    return (
        <AnimatePresence>
            {integrationStatus !== IntegrationStatusEnum.IDLE && (
                <>
                    {/* Black Overlay */}
                    <motion.div
                        style={{ margin: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-10 m-0"
                    />

                    {/* Status Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed z-20 max-w-md left-0 right-0 top-[40%] mx-auto transform -translate-y-1/2 bg-white p-6 rounded-lg shadow-border"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIntegrationStatus(IntegrationStatusEnum.IDLE)}
                            className="text-gray-500 w-5 h-5 absolute top-4 right-4 hover:text-gray-700"
                        >
                            <CgClose />
                        </button>

                        {/* Pending State */}
                        {integrationStatus === IntegrationStatusEnum.PENDING && (
                            <div className="flex items-center space-x-2">
                                <HiArrowPath className="w-5 h-5 animate-spin text-blue-500" />
                                <span className="text-gray-500">Verifying integration...</span>
                            </div>
                        )}

                        {/* Success State */}
                        {integrationStatus === IntegrationStatusEnum.SUCCESS && (
                            <div className="space-y-4">
                                <HiSparkles className="w-10 h-10 text-green-500 mx-auto" />
                                <h3 className="text-green-500 text-lg font-bold text-center">
                                    Integration Successful!
                                </h3>
                                <div className="space-y-2">
                                    <button className="bg-green-500 text-white rounded-md px-4 py-2 w-full hover:bg-green-600 transition-colors">
                                        Explore Admin Panel
                                    </button>
                                    <button className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600 transition-colors">
                                        Start Chatting
                                    </button>
                                </div>
                                {showSocial && (
                                    <div className="flex justify-center space-x-4 mt-4">
                                        <button
                                            onClick={() =>
                                                navigator.share?.({
                                                    title: "Chatbot Integration",
                                                    url: window.location.href,
                                                })
                                            }
                                            className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors"
                                        >
                                            <HiGlobeAlt className="w-5 h-5 text-blue-500" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigator.share?.({
                                                    title: "Chatbot Integration",
                                                    url: window.location.href,
                                                })
                                            }
                                            className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors"
                                        >
                                            <HiShare className="w-5 h-5 text-blue-500" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Error State */}
                        {integrationStatus === IntegrationStatusEnum.ERROR && (
                            <div className="space-y-4">
                                <HiExclamationTriangle className="w-10 h-10 text-red-500 mx-auto" />
                                <h3 className="text-red-500 text-lg font-bold text-center">
                                    Integration Failed
                                </h3>
                                <p className="text-red-500 text-center">
                                    Please ensure the code is properly installed on your website
                                </p>
                                <button
                                    onClick={() => setIntegrationStatus(IntegrationStatusEnum.IDLE)}
                                    className="bg-red-500 text-white rounded-md px-4 py-2 w-full hover:bg-red-600 transition-colors"
                                >
                                    Retry Verification
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
