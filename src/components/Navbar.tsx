"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProviderClient";
import { Moon, Sun, Calculator } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Calculator className={styles.icon} />
                    <span className="gradient-text" style={{ fontWeight: 700, fontSize: "1.25rem" }}>FinanceHub</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/sip-calculator" className={styles.navLink}>SIP</Link>
                    <Link href="/emi-calculator" className={styles.navLink}>EMI</Link>
                    <Link href="/gst-calculator" className={styles.navLink}>GST</Link>
                </div>
                <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
        </nav>
    );
}
