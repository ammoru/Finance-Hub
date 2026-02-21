import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | FinanceHub",
    description: "Learn about FinanceHub — a free, open-source suite of premium financial calculators designed to help Indians plan their wealth, taxes, and investments.",
};

export default function AboutPage() {
    const sectionStyle = { marginBottom: "2rem", color: "var(--secondary-foreground)", lineHeight: "1.8" };
    const headingStyle = { fontSize: "1.25rem", marginBottom: "0.75rem", color: "var(--foreground)" };

    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                <span className="gradient-text">About</span> FinanceHub
            </h1>
            <p style={{ color: "var(--secondary-foreground)", marginBottom: "2.5rem" }}>Empowering smarter financial decisions — for free.</p>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Our Mission</h2>
                <p>FinanceHub was created with a simple goal: to provide every Indian with free, instant, and beautifully designed financial tools that help them make smarter money decisions. Whether you are a salaried professional planning your taxes, a first-time home buyer calculating EMIs, or a parent investing in your child's future via PPF — our calculators are built to serve you.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>What We Offer</h2>
                <p>We currently offer a comprehensive suite of <strong>9+ financial calculators</strong> — all completely free and running directly in your browser with zero data being sent to any server. Our tools include:</p>
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
                    <li><strong>SIP Calculator</strong> — Plan your monthly mutual fund investments.</li>
                    <li><strong>Lumpsum Calculator</strong> — Project one-time investment growth.</li>
                    <li><strong>EMI Calculator</strong> — Compute Home/Car loan EMIs with PDF export.</li>
                    <li><strong>GST Calculator</strong> — Add or remove GST from any price instantly.</li>
                    <li><strong>Income Tax Calculator</strong> — Compare Old vs New Tax Regime.</li>
                    <li><strong>CAGR Calculator</strong> — Find annualized investment growth.</li>
                    <li><strong>FD Calculator</strong> — Estimate Fixed Deposit maturity amounts.</li>
                    <li><strong>PPF Calculator</strong> — Calculate your Public Provident Fund returns.</li>
                    <li><strong>Salary Hike Calculator</strong> — Determine your increment and new CTC.</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Privacy First</h2>
                <p>We believe your financial data is deeply personal. That's why all our calculations are executed 100% client-side in your browser. We never store, transmit, or have access to any numbers you enter. Your data stays on your device — always.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Built With Modern Technology</h2>
                <p>FinanceHub is built using Next.js, React, and modern web standards. Our site is statically generated for blazing-fast performance, optimized for SEO, and designed to work beautifully on desktops, tablets, and mobile devices.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Contact Us</h2>
                <p>Have suggestions, feedback, or want to report an issue? We'd love to hear from you! Reach out at: <strong>contact@financehub.com</strong></p>
            </section>
        </div>
    );
}
