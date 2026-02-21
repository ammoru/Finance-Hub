import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer | FinanceHub",
    description: "Read the Disclaimer for FinanceHub. Our calculators provide estimates and should not be considered professional financial advice.",
};

export default function DisclaimerPage() {
    const sectionStyle = { marginBottom: "2rem", color: "var(--secondary-foreground)", lineHeight: "1.8" };
    const headingStyle = { fontSize: "1.25rem", marginBottom: "0.75rem", color: "var(--foreground)" };

    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                <span className="gradient-text">Disclaimer</span>
            </h1>
            <p style={{ color: "var(--secondary-foreground)", marginBottom: "2.5rem" }}>Last Updated: February 21, 2026</p>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>General Information</h2>
                <p>The information provided by FinanceHub ("we", "our", or "us") on this website is for general informational and educational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Not Professional Financial Advice</h2>
                <p>The calculators and tools available on this website are designed to provide approximate estimations based on standard mathematical formulas. These calculations are <strong>not a substitute</strong> for professional financial planning, tax advisory, or investment guidance. Results may vary based on the specific rules, exemptions, and conditions applicable to your individual financial situation.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Tax & Government Policy Changes</h2>
                <p>Indian tax brackets, GST rates, PPF interest rates, and other government-regulated financial parameters are subject to change at any time based on Union Budget announcements and Reserve Bank of India (RBI) policy decisions. While we make every effort to keep our calculators updated, we cannot guarantee that they reflect the most current regulations at all times.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Investment Risk</h2>
                <p>Mutual fund investments are subject to market risks. Past performance is not indicative of future results. SIP and Lumpsum calculators provide projections based on assumed constant rates of return, which is unlikely in real market conditions. Please read all scheme-related documents carefully before investing.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>No Liability</h2>
                <p>Under no circumstance shall FinanceHub be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from the use of information obtained through this website.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>External Links</h2>
                <p>Through this website, you may be able to link to other websites which are not under the control of FinanceHub. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>Consult a Professional</h2>
                <p>We always recommend consulting a certified Chartered Accountant (CA), SEBI-registered financial advisor, or qualified tax consultant before making any important financial decisions involving investments, loans, or tax filings.</p>
            </section>
        </div>
    );
}
