import type { Metadata } from "next";
import SalaryHikeCalculatorClient from "./SalaryHikeCalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

export const metadata: Metadata = {
    alternates: { canonical: "https://ammoru.in/hike-calculator" },
    title: "Salary Hike Calculator | Calculate Salary Increment Percentage",
    description: "Calculate your new compensation, salary hike percentage, and monthly take-home increments instantly using our free Salary Increment Calculator.",
    openGraph: { images: ["/api/og?title=Salary%20Hike%20Calculator%20%7C%20Calculate%20Salary%20Increment%20Percentage"] },
    twitter: { card: "summary_large_image", images: ["/api/og?title=Salary%20Hike%20Calculator%20%7C%20Calculate%20Salary%20Increment%20Percentage"] },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", "name": "Salary Hike Calculator", "url": "https://ammoru.in/hike-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } };

export default function SalaryHikeCalculatorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Salary Hike Calculator" }]} />
            <SalaryHikeCalculatorClient />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">What is a Salary Hike?</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    A Salary Hike refers to the percentage increase in an employee's compensation during appraisal cycles. Our dual-purpose tool can calculate increments from either a known percentage or a new offered salary.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>The Increment Formula</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    <strong>Hike % = [(New Salary - Current Salary) / Current Salary] × 100</strong>
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Disclaimer:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>This calculator computes gross CTC increment. Actual in-hand monthly increase may differ based on variable pay, PF contributions, and TDS bracket changes.</small>
                </div>
            </article>
            <RelatedCalculators currentPath="/hike-calculator" />
            <FAQSection faqs={calculatorFAQs.hike} pageName="Salary Hike Calculator" />
        </>
    );
}
