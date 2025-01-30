import {
    HiArrowPath,
    HiExclamationTriangle,
    HiGlobeAlt,
    HiShare,
    HiSparkles,
} from "react-icons/hi2";
import { IntegrationStatusEnum } from "./chat-integration";

export const IntegrationStatus = ({
    integrationStatus,
    setIntegrationStatus,
}: {
    integrationStatus: IntegrationStatusEnum;
    setIntegrationStatus: (type: IntegrationStatusEnum) => void;
}) => {
    return (
        <div>
            {/* Integration Status */}
            {integrationStatus === IntegrationStatusEnum.SUCCESS && (
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl space-y-6 text-center">
                    <div className="animate-confetti">
                        <HiSparkles className="w-12 h-12 text-green-600 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800">
                        Integration Successful!
                    </h3>
                    <div className="flex flex-col gap-3">
                        <button className="block md:w-full ml-auto px-4 py-1.5 md:p-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm">
                            Explore Admin Panel
                        </button>
                        <button className="block md:w-full ml-auto px-4 py-1.5 md:p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                            Start Chatting
                        </button>
                    </div>
                    <div className="flex justify-start md:justify-center gap-4">
                        <button className="text-gray-600 hover:text-blue-600" title="preview">
                            <HiGlobeAlt className="w-6 h-6" />
                        </button>
                        <button title="share" className="text-gray-600 hover:text-blue-600">
                            <HiShare className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            {integrationStatus === IntegrationStatusEnum.ERROR && (
                <div className="p-6 bg-red-50 border border-red-200 rounded-xl space-y-4">
                    <HiExclamationTriangle className="w-12 h-12 text-red-600 mx-auto" />
                    <h3 className="text-xl font-semibold text-red-800 text-center">
                        Integration Not Detected
                    </h3>
                    <p className="text-gray-600 text-center">
                        Please ensure the code is properly installed on your website
                    </p>
                    <button
                        onClick={() => setIntegrationStatus(IntegrationStatusEnum.IDLE)}
                        className="block ml-auto px-5 py-1.5  bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                        Retry Verification
                    </button>
                </div>
            )}

            {integrationStatus === IntegrationStatusEnum.PENDING && (
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center gap-3">
                    <HiArrowPath className="w-6 h-6 text-blue-600 animate-spin" />
                    <span className="text-blue-600">Checking website integration...</span>
                </div>
            )}
        </div>
    );
};
