"use client";

import { useEffect } from "react";

interface AdBannerProps {
    dataAdSlot: string;
    dataAdFormat?: string;
    dataFullWidthResponsive?: boolean;
}

export default function AdBanner({
    dataAdSlot,
    dataAdFormat = "auto",
    dataFullWidthResponsive = true,
}: AdBannerProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err: any) {
            console.warn("AdSense error:", err.message);
        }
    }, []);

    return (
        <div style={{ margin: "2rem auto", textAlign: "center", minHeight: "90px" }}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" /* Replace with your actual AdSense Publisher ID */
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            />
        </div>
    );
}
