import type { Metadata } from "next";
import PPFCalculatorClient from "./PPFCalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "https://financehub.com/ppf-calculator" },
    title: "PPF Calculator | Public Provident Fund Monthly Investment Online",
    description: "Calculate your Public Provident Fund (PPF) maturity amount and interest earned over 15 years. Utilize the latest 7.1% interest rate for tax-saving investments in India.",
    openGraph: { images: ["/api/og?title=PPF%20Calculator%20%7C%20Public%20Provident%20Fund%20Monthly%20Investment%20Online"] },
    twitter: { card: "summary_large_image", images: ["/api/og?title=PPF%20Calculator%20%7C%20Public%20Provident%20Fund%20Monthly%20Investment%20Online"] },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", "name": "PPF Calculator", "url": "https://financehub.com/ppf-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } };

export default function PPFCalculatorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "PPF Calculator" }]} />
            <PPFCalculatorClient />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">What is a Public Provident Fund (PPF)?</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    The Public Provident Fund (PPF) is a popular long-term investment scheme offered by the Government of India with sovereign guarantee. PPF falls under the Exempt-Exempt-Exempt (EEE) category — your deposit, interest earned, and maturity amount are all completely tax-free.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>PPF Compound Interest Formula</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    <strong>F = P [((1+i)^n-1)/i]</strong><br />Where F is the maturity amount, P is the annual installment, n is the number of years (typically 15), and i is the interest rate (currently 7.1%).
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Important:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>PPF interest rate is determined by the Ministry of Finance every quarter. Maximum investment is Rs. 1,50,000 per year.</small>
                </div>
            </article>
            <RelatedCalculators currentPath="/ppf-calculator" />
            <FAQSection faqs={calculatorFAQs.ppf} pageName="PPF Calculator" />
        </>
    );
}
