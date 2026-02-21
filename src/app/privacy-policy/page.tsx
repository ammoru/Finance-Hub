import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | FinanceHub",
    description: "Read the Privacy Policy for FinanceHub. Learn about how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
    const sectionStyle = { marginBottom: "2rem", color: "var(--secondary-foreground)", lineHeight: "1.8" };
    const headingStyle = { fontSize: "1.25rem", marginBottom: "0.75rem", color: "var(--foreground)" };

    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                <span className="gradient-text">Privacy</span> Policy
            </h1>
            <p style={{ color: "var(--secondary-foreground)", marginBottom: "2.5rem" }}>Last Updated: February 21, 2026</p>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>1. Introduction</h2>
                <p>Welcome to FinanceHub ("we", "our", or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>2. Information We Collect</h2>
                <p>We do not collect any personal information directly. All calculations are performed entirely in your browser — no data is sent to or stored on any server. However, we may collect non-personal information automatically, including:</p>
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Anonymized IP address (via analytics tools)</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>3. Use of Cookies</h2>
                <p>We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>4. Google AdSense</h2>
                <p>We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Google Ads Settings</a>.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>5. Google Analytics</h2>
                <p>We may use Google Analytics to monitor and analyze the use of our website. Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. This data is shared with other Google services. You can opt-out of having made your activity on the website available to Google Analytics by installing the Google Analytics opt-out browser add-on.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>6. Third-Party Links</h2>
                <p>Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>7. Children's Privacy</h2>
                <p>Our website does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>8. Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={headingStyle}>9. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, you can contact us at: <strong>contact@financehub.com</strong></p>
            </section>
        </div>
    );
}
