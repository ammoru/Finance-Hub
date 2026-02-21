interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQSection({ faqs, pageName }: { faqs: FAQItem[], pageName: string }) {
    // JSON-LD FAQPage Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <section style={{ maxWidth: "800px", margin: "3rem auto 0 auto" }}>
                <h2 style={{ fontSize: "1.75rem", marginBottom: "1.5rem", color: "var(--foreground)" }}>
                    Frequently Asked Questions — {pageName}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            style={{
                                padding: "1.25rem",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border)",
                                backgroundColor: "color-mix(in srgb, var(--surface) 80%, transparent)",
                                cursor: "pointer",
                            }}
                        >
                            <summary style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "1rem", lineHeight: "1.5" }}>
                                {faq.question}
                            </summary>
                            <p style={{ marginTop: "0.75rem", color: "var(--secondary-foreground)", lineHeight: "1.7", fontSize: "0.9375rem" }}>
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </section>
        </>
    );
}
