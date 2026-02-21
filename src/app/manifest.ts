import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "FinanceHub — Free Financial Calculators",
        short_name: "FinanceHub",
        description: "Free, premium financial calculators for SIP, EMI, GST, Income Tax, FD, PPF, CAGR, and more. Calculate instantly in your browser.",
        start_url: "/",
        display: "standalone",
        background_color: "#020617",
        theme_color: "#2563eb",
        orientation: "portrait-primary",
        categories: ["finance", "utilities", "productivity"],
        icons: [
            {
                src: "/api/app-icon?size=192",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "/api/app-icon?size=512",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            },
        ],
    };
}
