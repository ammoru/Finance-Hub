import type { Metadata } from "next";
import SIPCalculatorClient from "../SIPCalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

// List of top banks/funds for programmatic SEO
const seoPaths = [
    { slug: "sbi-mutual-fund", name: "SBI Mutual Fund" },
    { slug: "hdfc-mutual-fund", name: "HDFC Mutual Fund" },
    { slug: "icici-prudential", name: "ICICI Prudential" },
    { slug: "axis-mutual-fund", name: "Axis Mutual Fund" },
    { slug: "kotak-mutual-fund", name: "Kotak Mutual Fund" },
    { slug: "zerodha-mutual-fund", name: "Zerodha Mutual Fund" },
    { slug: "groww-mutual-fund", name: "Groww Mutual Fund" },
    { slug: "nippon-india", name: "Nippon India" },
];

export async function generateStaticParams() {
    return seoPaths.map((path) => ({
        bank: path.slug,
    }));
}

export async function generateMetadata({ params }: { params: { bank: string } }): Promise<Metadata> {
    const bankData = seoPaths.find((p) => p.slug === params.bank);
    const bankName = bankData ? bankData.name : "Mutual Fund";

    return {
        title: `${bankName} SIP Calculator: Predict ${bankName} Returns Free`,
        description: `Calculate your ${bankName} SIP returns online. Instantly estimate and plan your long-term wealth creation with our free ${bankName} SIP Calculator.`,
        alternates: { canonical: `https://financehub.com/sip-calculator/${params.bank}` },
    };
}

export default function BankSIPCalculatorPage({ params }: { params: { bank: string } }) {
    const bankData = seoPaths.find((p) => p.slug === params.bank);
    const bankName = bankData ? bankData.name : "Mutual Fund";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": `${bankName} SIP Calculator`,
        "url": `https://financehub.com/sip-calculator/${params.bank}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SIP Calculator", href: "/sip-calculator" }, { label: bankName }]} />
            <SIPCalculatorClient bankName={bankName} />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">What is a {bankName} SIP?</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    A Systematic Investment Plan (SIP) in {bankName} is a smart investment vehicle allowing you to invest small amounts periodically instead of a large lump sum. Doing this consistently across the {bankName} portfolio helps in rupee-cost averaging and navigating market volatility safely.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How does the {bankName} SIP Calculator work?</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    Our custom {bankName} return calculator uses compounding interest math to forecast your wealth over time. Entering your monthly expected investment and selected {bankName} historic return rate will calculate your exponential compounding gains instantly.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>The Math Behind Returns</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    The calculator employs a standard mathematical formula applied across all {bankName} plans:<br />
                    <strong>M = P × ({"{"}[(1 + i)^n – 1{"}"} / i]) × (1 + i)</strong><br />
                    Where:<br /> M is the estimated maturity amount,<br /> P is the monthly investment amount,<br /> n is the number of total months, <br /> and i is the periodic rate of interest you select.
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Disclaimer:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>The calculations produced by this tool are for informational purposes only. Actual {bankName} scheme returns are subject to market risks, and this calculator does not guarantee future performance or promise specific financial advice.</small>
                </div>
            </article>

            <RelatedCalculators currentPath="/sip-calculator" />
            <FAQSection faqs={calculatorFAQs.sip} pageName={`${bankName} SIP Calculator`} />
        </>
    );
}
