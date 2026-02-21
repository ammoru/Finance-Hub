import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | FinanceHub",
    description: "Get in touch with the FinanceHub team. Reach out for feedback, suggestions, questions, or partnership inquiries.",
};

export default function ContactPage() {
    const sectionStyle = { marginBottom: "2rem", color: "var(--secondary-foreground)", lineHeight: "1.8" };

    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                <span className="gradient-text">Contact</span> Us
            </h1>
            <p style={{ color: "var(--secondary-foreground)", marginBottom: "2.5rem" }}>We'd love to hear from you. Reach out with any questions or feedback.</p>

            <section style={sectionStyle}>
                <div className="premium-card" style={{ padding: "2.5rem", borderRadius: "1rem" }}>
                    <div style={{ marginBottom: "2rem" }}>
                        <h3 style={{ color: "var(--foreground)", marginBottom: "0.5rem" }}>📧 Email</h3>
                        <p>For general queries, feedback, or support:<br />
                            <a href="mailto:ammoru42@gmail.com" style={{ color: "var(--primary)", fontWeight: 600 }}>ammoru42@gmail.com</a></p>
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <h3 style={{ color: "var(--foreground)", marginBottom: "0.5rem" }}>🤝 Partnerships & Advertising</h3>
                        <p>For business inquiries, sponsorships, or ad partnerships:<br />
                            <a href="mailto:ammoru42@gmail.com" style={{ color: "var(--primary)", fontWeight: 600 }}>ammoru42@gmail.com</a></p>
                    </div>

                    <div>
                        <h3 style={{ color: "var(--foreground)", marginBottom: "0.5rem" }}>🐛 Report a Bug</h3>
                        <p>Found an issue with one of our calculators? Let us know and we'll fix it right away:<br />
                            <a href="mailto:ammoru42@gmail.com" style={{ color: "var(--primary)", fontWeight: 600 }}>ammoru42@gmail.com</a></p>
                    </div>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", color: "var(--foreground)" }}>Response Time</h2>
                <p>We typically respond to all emails within 24–48 hours during business days. For urgent matters, please include "URGENT" in your subject line.</p>
            </section>
        </div>
    );
}
