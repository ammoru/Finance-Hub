import type { Metadata } from "next";
import GSTCalculatorClient from "./GSTCalculatorClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import RelatedCalculators from "@/components/RelatedCalculators";
import { calculatorFAQs } from "@/data/faqs";

export const metadata: Metadata = {
    alternates: { canonical: "https://ammoru.in/gst-calculator" },
    title: "GST Calculator India: Add or Exclude GST Online",
    description: "Calculate GST amount easily with our free online Goods and Services Tax calculator. Find out the net/gross price including CGST, SGST, and IGST for Indian tax slabs.",
    openGraph: { images: ["/api/og?title=GST%20Calculator%20India%3A%20Add%20or%20Exclude%20GST%20Online"] },
    twitter: { card: "summary_large_image", images: ["/api/og?title=GST%20Calculator%20India%3A%20Add%20or%20Exclude%20GST%20Online"] },
};

const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", "name": "GST Calculator", "url": "https://ammoru.in/gst-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } };

export default function GSTCalculatorPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "GST Calculator" }]} />
            <GSTCalculatorClient />

            <article className="seo-content" style={{ marginTop: "4rem", maxWidth: "800px", margin: "4rem auto 0 auto" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }} className="gradient-text">What is GST?</h2>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services. It is a comprehensive, multistage, destination-based tax levied on every value addition.
                </p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>The GST Calculation Formula</h3>
                <p style={{ marginBottom: "1.5rem", color: "var(--secondary-foreground)", lineHeight: "1.8" }}>
                    <strong>Adding GST:</strong> GST Amount = (Original Cost × GST %) / 100. Net Price = Original Cost + GST Amount.<br />
                    <strong>Removing GST:</strong> GST Amount = Original Cost - [Original Cost × {"{"}100 / (100 + GST %){"}"}]. Net Price = Original Cost - GST Amount.
                </p>
                <div style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", padding: "1.5rem", borderRadius: "1rem", marginTop: "2rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--primary)" }}>Disclaimer:</strong>
                    <small style={{ color: "var(--secondary-foreground)" }}>This calculator uses standard Indian GST percentage brackets and splits 50/50 for CGST and SGST assuming intra-state transactions.</small>
                </div>
            </article>
            <RelatedCalculators currentPath="/gst-calculator" />
            <FAQSection faqs={calculatorFAQs.gst} pageName="GST Calculator" />
        </>
    );
}
