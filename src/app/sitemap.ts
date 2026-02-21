import { MetadataRoute } from "next";

const seoBanks = [
    "sbi-mutual-fund",
    "hdfc-mutual-fund",
    "icici-prudential",
    "axis-mutual-fund",
    "kotak-mutual-fund",
    "zerodha-mutual-fund",
    "groww-mutual-fund",
    "nippon-india"
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ammoru.in"; // Replace with your actual domain

    const calculators = [
        "/sip-calculator",
        "/lumpsum-calculator",
        "/emi-calculator",
        "/gst-calculator",
        "/income-tax-calculator",
        "/cagr-calculator",
        "/fd-calculator",
        "/ppf-calculator",
        "/hike-calculator",
    ];

    const legal = [
        "/privacy-policy",
        "/terms",
        "/disclaimer",
        "/about",
        "/contact",
    ];

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        ...calculators.map((path) => ({
            url: `${baseUrl}${path}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
        ...seoBanks.map((bankSlug) => ({
            url: `${baseUrl}/sip-calculator/${bankSlug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        ...legal.map((path) => ({
            url: `${baseUrl}${path}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        })),
    ];
}
