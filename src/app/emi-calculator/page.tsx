import type { Metadata } from "next";
import EMICalculatorClient from "./EMICalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "https://financehub.com/emi-calculator" },
    title: "EMI Calculator | Home Loan & Car Loan EMI with Amortization",
    description: "Calculate your monthly EMI for Home Loan, Car Loan, or Personal Loan using our accurate EMI Calculator. View full amortization schedule and download PDF.",
    openGraph: { images: ["/api/og?title=EMI%20Calculator%20%7C%20Home%20Loan%20%26%20Car%20Loan%20EMI%20with%20Amortization"] },
    twitter: { card: "summary_large_image", images: ["/api/og?title=EMI%20Calculator%20%7C%20Home%20Loan%20%26%20Car%20Loan%20EMI%20with%20Amortization"] },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", "name": "EMI Calculator", "url": "https://financehub.com/emi-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } };

export default function EMICalculatorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "EMI Calculator" }]} />
            <EMICalculatorClient />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">What is EMI?</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How is EMI calculated?</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    <strong>EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]</strong><br />Where P = Principal loan amount, R = Monthly interest rate, N = Number of monthly installments.
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Disclaimer:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>The calculations are estimates. Actual EMI may vary based on processing fees, prepayment charges, and floating interest rate changes by the bank.</small>
                </div>
            </article>
            <RelatedCalculators currentPath="/emi-calculator" />
            <FAQSection faqs={calculatorFAQs.emi} pageName="EMI Calculator" />
        </>
    );
}
