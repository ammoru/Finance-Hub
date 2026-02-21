import type { Metadata } from "next";
import CAGRCalculatorClient from "./CAGRCalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "https://financehub.com/cagr-calculator" },
    title: "CAGR Calculator | Calculate Compound Annual Growth Rate Online",
    description: "Easily calculate the Compound Annual Growth Rate (CAGR) of your investments. Find out your actual annualized returns over any given period of time.",
    openGraph: { images: ["/api/og?title=CAGR%20Calculator%20%7C%20Calculate%20Compound%20Annual%20Growth%20Rate%20Online"] },
    twitter: { card: "summary_large_image", images: ["/api/og?title=CAGR%20Calculator%20%7C%20Calculate%20Compound%20Annual%20Growth%20Rate%20Online"] },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", "name": "CAGR Calculator", "url": "https://financehub.com/cagr-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } };

export default function CAGRCalculatorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "CAGR Calculator" }]} />
            <CAGRCalculatorClient />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">What is CAGR?</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    Compound Annual Growth Rate (CAGR) provides a smoothed annualized rate of return for an investment over a specified period. Unlike absolute returns, CAGR accounts for compounding, making it the most accurate way to compare past performance of investments.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>The Mathematical Formula</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    <strong>CAGR = [(Final Value / Initial Value) ^ (1 / Number of Years)] - 1</strong>
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Disclaimer:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>CAGR indicates a smoothed average growth rate. It does not reflect market volatility that might have occurred between dates.</small>
                </div>
            </article>
            <RelatedCalculators currentPath="/cagr-calculator" />
            <FAQSection faqs={calculatorFAQs.cagr} pageName="CAGR Calculator" />
        </>
    );
}
