import type { Metadata } from "next";
import LumpsumCalculatorClient from "./LumpsumCalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

export const metadata: Metadata = {
    alternates: { canonical: "https://ammoru.in/lumpsum-calculator" },
    title: "Mutual Fund Lumpsum Calculator | Calculate Onetime Investment Returns",
    description: "Calculate the maturity value of your one-time Lumpsum mutual fund investment. Estimate your wealth creation over time using the power of compounding.",
    openGraph: { images: ["/api/og?title=Mutual%20Fund%20Lumpsum%20Calculator%20%7C%20Calculate%20Onetime%20Investment%20Returns"] },
    twitter: { card: "summary_large_image", images: ["/api/og?title=Mutual%20Fund%20Lumpsum%20Calculator%20%7C%20Calculate%20Onetime%20Investment%20Returns"] },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", "name": "Lumpsum Calculator", "url": "https://ammoru.in/lumpsum-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } };

export default function LumpsumCalculatorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Lumpsum Calculator" }]} />
            <LumpsumCalculatorClient />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">What is a Lumpsum Investment?</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    A Lumpsum Investment involves depositing a significant amount of money into a Mutual Fund or other investment vehicle in a single, one-time payment, rather than breaking it down into smaller systematic monthly investments (SIPs). It is heavily utilized when an investor receives a large influx of capital at once, such as an annual bonus, inheritance, or the sale of real estate.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>SIP vs Lumpsum?</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    While a Systematic Investment Plan (SIP) allows you to average your purchase price out over time (reducing market volatility risk), a Lumpsum investment generally yields geometrically higher returns if your overall time horizon is long enough (10+ years), simply because your entire capital base stays in the market and compounds for a much longer period.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>The Lumpsum Compounding Formula</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    <strong>A = P(1 + r/n)^(n × t)</strong><br />Where A is the estimated final maturity amount, P is the principal lumpsum amount invested, r is the expected annual rate of return, and t is the investment duration in years.
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Disclaimer:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>Mutual fund investments are subject to market risks. The calculations here are extrapolated constant historical growth and do not guarantee future performance.</small>
                </div>
            </article>
            <RelatedCalculators currentPath="/lumpsum-calculator" />
            <FAQSection faqs={calculatorFAQs.lumpsum} pageName="Lumpsum Calculator" />
        </>
    );
}
