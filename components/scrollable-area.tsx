"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

type ScrollableAreaProps = {
    children: ReactNode;
    className?: string;
    thumbClassName?: string;
    trackClassName?: string;
};

export const ScrollableArea = ({
    children,
    className = "",
    thumbClassName = "bg-blue-500",
    trackClassName = "bg-gray-100",
}: ScrollableAreaProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const thumb = thumbRef.current;

        const handleScroll = () => {
            if (!container || !thumb) return;

            const { scrollTop, scrollHeight, clientHeight } = container;
            const scrollPercent = scrollTop / (scrollHeight - clientHeight);
            const thumbHeight = 50;
            const maxTop = container.clientHeight - thumbHeight;

            thumb.style.top = `${scrollPercent * maxTop}px`;
            setIsScrolling(true);
        };

        const handleScrollEnd = () => {
            setIsScrolling(false);
        };

        container?.addEventListener("scroll", handleScroll);
        container?.addEventListener("scrollend", handleScrollEnd);

        return () => {
            container?.removeEventListener("scroll", handleScroll);
            container?.removeEventListener("scrollend", handleScrollEnd);
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            {/* Scrollable Content */}
            <div
                ref={containerRef}
                className="h-full overflow-y-auto scroll-smooth"
                style={{ scrollbarWidth: "none" }}
            >
                {children}
            </div>

            {/* Custom Scrollbar Track */}
            <div className={`absolute right-0 top-0 bottom-0 w-1 ${trackClassName} rounded-full`}>
                {/* Scrollbar Thumb */}
                <div
                    ref={thumbRef}
                    className={`absolute w-1 rounded-full transition-opacity duration-200 ${
                        isScrolling ? "opacity-100" : "opacity-70"
                    } ${thumbClassName}`}
                    style={{ height: "50px" }}
                />
            </div>
        </div>
    );
};
