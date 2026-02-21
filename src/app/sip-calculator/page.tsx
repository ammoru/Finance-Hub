import type { Metadata } from "next";
import SIPCalculatorClient from "./SIPCalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

export const metadata: Metadata = {
    alternates: { canonical: "https://ammoru.in/sip-calculator" },
    title: "Free SIP Calculator: Predict Mutual Fund Returns",
    description: "Calculate your mutual fund SIP (Systematic Investment Plan) returns online. Plan your long-term wealth creation with our beautifully animated calculator.",
    openGraph: { images: ["/api/og?title=Free%20SIP%20Calculator%3A%20Predict%20Mutual%20Fund%20Returns"] },
    twitter: { card: "summary_large_image", images: ["/api/og?title=Free%20SIP%20Calculator%3A%20Predict%20Mutual%20Fund%20Returns"] },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SIP Calculator",
    "url": "https://ammoru.in/sip-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function SIPCalculatorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SIP Calculator" }]} />
            <SIPCalculatorClient />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">What is a SIP?</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    A Systematic Investment Plan (SIP) is an investment vehicle offered by many mutual funds to investors, allowing them to invest small amounts periodically instead of lump sums. The frequency of investment is usually weekly, monthly, or quarterly.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How does the SIP Calculator work?</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    Our SIP return calculator uses the compound interest formula to forecast your future wealth. By entering your expected monthly investment, expected rate of return, and your time horizon, the calculator computes the exponential compounding effect on your money over time.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>The Math Behind SIP Returns</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    The calculator employs a standard formula: <br />
                    <strong>M = P × ({"{"}[(1 + i)^n – 1{"}"} / i]) × (1 + i)</strong><br />
                    Where:<br /> M is the maturity amount,<br /> P is the monthly investment,<br /> n is the number of months, <br /> and i is the periodic rate of interest.
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Disclaimer:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>The calculations produced by this tool are for informational purposes only. Actual mutual fund returns are subject to market risks, and this calculator does not guarantee future performance or specific financial advice.</small>
                </div>
            </article>

            <RelatedCalculators currentPath="/sip-calculator" />
            <FAQSection faqs={calculatorFAQs.sip} pageName="SIP Calculator" />
        </>
    );
}
