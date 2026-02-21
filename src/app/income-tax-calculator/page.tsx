import type { Metadata } from "next";
import IncomeTaxCalculatorClient from "./IncomeTaxCalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

export const metadata: Metadata = {
    alternates: { canonical: "https://ammoru.in/income-tax-calculator" },
    title: "Income Tax Calculator | Compare Old vs New Tax Regime",
    description: "Calculate your income tax liability instantly. Compare the Old Tax Regime vs New Tax Regime with our latest calculator based on current Government of India tax slabs.",
    openGraph: { images: ["/api/og?title=Income%20Tax%20Calculator%20%7C%20Compare%20Old%20vs%20New%20Tax%20Regime"] },
    twitter: { card: "summary_large_image", images: ["/api/og?title=Income%20Tax%20Calculator%20%7C%20Compare%20Old%20vs%20New%20Tax%20Regime"] },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", "name": "Income Tax Calculator", "url": "https://ammoru.in/income-tax-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } };

export default function IncomeTaxCalculatorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Income Tax Calculator" }]} />
            <IncomeTaxCalculatorClient />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">How the Indian Income Tax System Works</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    The Income Tax Department of India allows taxpayers to choose between two distinct tax systems: the Old Tax Regime and the New Tax Regime. Our dual-engine calculator runs your income through both simultaneously, factoring in Section 87A rebates and standard deductions.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>New Tax Regime</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    Lower tax rates but mandates foregoing most traditional exemptions and deductions (like 80C, 80D, HRA, and LTA). Standard deduction of Rs. 50,000 is now available.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Old Tax Regime</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    Higher tax rates but allows numerous tax-saving deductions. If you have significant investments in PPF, ELSS, Life Insurance (Section 80C), Mediclaim (Section 80D), the Old Regime might still be more beneficial.
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Disclaimer:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>Calculations are estimates based on the latest Indian financial budget proposals. Always consult a certified Chartered Accountant (CA) before filing your ITR.</small>
                </div>
            </article>
            <RelatedCalculators currentPath="/income-tax-calculator" />
            <FAQSection faqs={calculatorFAQs.incomeTax} pageName="Income Tax Calculator" />
        </>
    );
}
