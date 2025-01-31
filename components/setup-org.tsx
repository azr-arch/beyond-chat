"use client";

import { useEffect, useRef, useState } from "react";
import { FormField } from "./sign-up";
import { HiOfficeBuilding, HiRefresh } from "react-icons/hi";
import { HiGlobeAlt, HiSparkles } from "react-icons/hi2";
import { PiArrowUpRightFill } from "react-icons/pi";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

export const SetupOrg = () => {
    const [companyDetails, setCompanyDetails] = useState({
        name: "",
        website: "",
        description: "",
    });

    const [selectedPage, setSelectedPage] = useState<string | null>(null);

    // Dummy data
    const scrapingProgress = {
        detected: 5,
        scraped: 3,
        pending: 2,
    };

    const pages = [
        { name: "Homepage", status: "scraped" },
        { name: "Pricing", status: "scraped" },
        { name: "Contact", status: "scraped" },
        { name: "About Us", status: "pending" },
        { name: "Blog", status: "pending" },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    // Handle scroll
    useEffect(() => {
        const container = containerRef.current;
        const thumb = thumbRef.current;

        if (!container || !thumb) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const scrollPercent = scrollTop / (scrollHeight - clientHeight);

            // Update thumb position
            const thumbHeight = 50; // Fixed thumb height
            const maxTop = container.clientHeight - thumbHeight;
            thumb.style.top = `${scrollPercent * maxTop}px`;
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-generate shimmer effect
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAutoGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setCompanyDetails({
                ...companyDetails,
                description: "Dummy meta description fetched from website",
            });
            setIsGenerating(false);
        }, 1000); // 1-second delay
    };

    return (
        <div className="relative flex h-full md:h-[80%] w-full md:max-w-2xl mx-auto bg-white rounded-none md:rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Scrollable Content */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto pr-4"
                style={{ scrollbarWidth: "none" }} // Hide default scrollbar
            >
                {/* Divider */}
                <div className="p-6 space-y-8">
                    <div className="border-b border-neutral-200 pb-4">
                        <Link
                            href={"/"}
                            className="text-blue-400 hover:underline float-right text-sm"
                        >
                            Back to login
                        </Link>

                        <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
                            Setup Your Organization
                        </h2>
                        <p className="text-gray-600 text-sm lg:text-base">
                            Complete your chatbot setup in 3 simple steps
                        </p>
                    </div>

                    {/* Company Details Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-600 pl-3">
                            Company Information
                        </h3>

                        <FormField
                            label="Company Name"
                            placeholder="BeyondChats Inc"
                            type="text"
                            icon={<HiOfficeBuilding className="text-gray-400" />}
                        />

                        <FormField
                            label="Website URL"
                            placeholder="https://beyondchats.com"
                            type="url"
                            icon={<HiGlobeAlt className="text-gray-400" />}
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <div className="relative">
                                <textarea
                                    className="w-full text-primary shadow-border px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32"
                                    placeholder="Describe your organization..."
                                    value={companyDetails.description}
                                    onChange={(e) =>
                                        setCompanyDetails({
                                            ...companyDetails,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    onClick={handleAutoGenerate}
                                    className={`absolute bottom-3 right-3 text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 ${
                                        isGenerating ? "animate-shimmer" : ""
                                    }`}
                                >
                                    <HiSparkles className="text-lg" />
                                    Auto-generate
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scraping Progress Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-600 pl-3">
                            Website Analysis
                        </h3>

                        <div className="p-4 bg-gray-50 rounded-lg border shadow-border border-gray-100">
                            <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 items-start sm:items-center justify-between mb-4">
                                <div>
                                    <p className="font-medium text-gray-700">Scraping Progress</p>
                                    <p className="text-sm text-gray-500">
                                        {scrapingProgress.detected} pages detected,{" "}
                                        {scrapingProgress.scraped} scraped,{" "}
                                        {scrapingProgress.pending} pending
                                    </p>
                                </div>
                                <div className="self-end sm:self-auto flex items-center gap-2 text-blue-600">
                                    <HiRefresh className="animate-spin" />
                                    <span className="text-sm">Processing...</span>
                                </div>
                            </div>

                            {/* List of Pages */}
                            <div className="space-y-3">
                                {pages.map((page, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                                            selectedPage === page.name
                                                ? "bg-blue-50 border border-blue-200"
                                                : "bg-white border border-gray-100 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setSelectedPage(page.name)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">
                                                {page.name}
                                            </span>
                                            <span
                                                className={`text-xs font-semibold ${
                                                    page.status === "scraped"
                                                        ? "text-green-600"
                                                        : "text-yellow-600"
                                                }`}
                                            >
                                                {page.status === "scraped" ? "Scraped" : "Pending"}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-5 border-t border-neutral-200">
                            <Link
                                href={"/integration"}
                                className="ml-auto w-fit text-sm py-1 hover:bg-blue-200/60 border rounded-md border-neutral-300 gap-x-1 shadow-border px-4 flex items-center text-blue-500 font-medium"
                            >
                                <PiArrowUpRightFill className="w-5 h-5" />
                                Final step
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-100 rounded-full">
                {/* Scrollbar Thumb */}
                <motion.div
                    ref={thumbRef}
                    className="absolute w-1 bg-blue-500 rounded-full"
                    style={{ height: "50px" }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                />
            </div>
        </div>
    );
};
