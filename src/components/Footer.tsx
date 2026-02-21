import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <h3 className="gradient-text" style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>FinanceHub</h3>
                        <p className={styles.brandDesc}>Free, premium financial calculators for every Indian. Plan your wealth, taxes, and investments with precision.</p>
                    </div>

                    {/* Calculators */}
                    <div>
                        <h4 className={styles.columnTitle}>Calculators</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/sip-calculator">SIP Calculator</Link></li>
                            <li><Link href="/lumpsum-calculator">Lumpsum Calculator</Link></li>
                            <li><Link href="/emi-calculator">EMI Calculator</Link></li>
                            <li><Link href="/gst-calculator">GST Calculator</Link></li>
                            <li><Link href="/income-tax-calculator">Income Tax</Link></li>
                            <li><Link href="/fd-calculator">FD Calculator</Link></li>
                            <li><Link href="/ppf-calculator">PPF Calculator</Link></li>
                            <li><Link href="/cagr-calculator">CAGR Calculator</Link></li>
                            <li><Link href="/hike-calculator">Salary Hike</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className={styles.columnTitle}>Legal</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms & Conditions</Link></li>
                            <li><Link href="/disclaimer">Disclaimer</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className={styles.columnTitle}>Company</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} FinanceHub. All rights reserved.</p>
                    <p>Made with ❤️ in India</p>
                </div>
            </div>
        </footer>
    );
}
