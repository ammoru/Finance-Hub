import type { Metadata } from "next";
import FDCalculatorClient from "./FDCalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "https://financehub.com/fd-calculator" },
    title: "Fixed Deposit (FD) Returns Calculator | Bank FD Interest Rates",
    description: "Calculate your Fixed Deposit (FD) maturity amount and interest earned online. Easily find out your bank FD returns using our interactive calculator.",
    openGraph: { images: ["/api/og?title=Fixed%20Deposit%20(FD)%20Returns%20Calculator%20%7C%20Bank%20FD%20Interest%20Rates"] },
    twitter: { card: "summary_large_image", images: ["/api/og?title=Fixed%20Deposit%20(FD)%20Returns%20Calculator%20%7C%20Bank%20FD%20Interest%20Rates"] },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", "name": "FD Calculator", "url": "https://financehub.com/fd-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } };

export default function FDCalculatorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FD Calculator" }]} />
            <FDCalculatorClient />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">What is a Fixed Deposit (FD)?</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    A Fixed Deposit (FD) is a financial instrument provided by banks and NBFCs which provides investors a higher rate of interest than a regular savings account, until the given maturity date. It is considered one of the safest investment options.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>FD Compound Interest Formula</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    <strong>A = P(1 + r/n)^(n × t)</strong><br />Where A is the maturity amount, P is the principal deposit, r is the annual rate of interest, n is the compounding frequency per year, and t is the tenure in years.
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Disclaimer:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>This calculator assumes quarterly compounding as standard. Actual returns may vary depending on TDS and day-count conventions.</small>
                </div>
            </article>
            <RelatedCalculators currentPath="/fd-calculator" />
            <FAQSection faqs={calculatorFAQs.fd} pageName="FD Calculator" />
        </>
    );
}
