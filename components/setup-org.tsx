"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormField } from "./sign-up";
import { HiOfficeBuilding, HiRefresh } from "react-icons/hi";
import { HiGlobeAlt, HiSparkles } from "react-icons/hi2";

export const SetupOrg = () => {
    const [companyDetails, setCompanyDetails] = useState({
        name: "",
        website: "",
        description: "",
    });

    return (
        <div className="w-full max-w-2xl h-[80%] overflow-y-scroll mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Setup Your Organization
                </h2>
                <p className="text-gray-600">Complete your chatbot setup in 3 simple steps</p>
            </div>

            <div className="space-y-8">
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
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32"
                                placeholder="Describe your organization..."
                                value={companyDetails.description}
                                onChange={(e) =>
                                    setCompanyDetails({
                                        ...companyDetails,
                                        description: e.target.value,
                                    })
                                }
                            />
                            <button className="absolute bottom-3 right-3 text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
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

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="font-medium text-gray-700">Scraping Progress</p>
                                <p className="text-sm text-gray-500">5 pages detected</p>
                            </div>
                            <div className="flex items-center gap-2 text-blue-600">
                                <HiRefresh className="animate-spin" />
                                <span className="text-sm">Processing...</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <ProgressBar label="Homepage" percentage={100} />
                            <ProgressBar label="Pricing" percentage={80} />
                            <ProgressBar label="Contact" percentage={45} />
                        </div>
                    </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Continue to Integration
                </Button>
            </div>
        </div>
    );
};

const ProgressBar = ({ label, percentage }: { label: string; percentage: number }) => (
    <div className="space-y-1">
        <div className="flex justify-between text-sm">
            <span className="text-gray-600">{label}</span>
            <span className="text-gray-500">{percentage}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);
