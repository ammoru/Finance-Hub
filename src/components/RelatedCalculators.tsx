import Link from "next/link";
import { TrendingUp, Wallet, Calculator, Percent, Scale, BriefcaseBusiness, PiggyBank, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./RelatedCalculators.module.css";

interface RelatedCalc {
    name: string;
    path: string;
    desc: string;
    color: string;
    Icon: LucideIcon;
}

const allCalculators: RelatedCalc[] = [
    { name: "SIP Calculator", path: "/sip-calculator", desc: "Plan monthly mutual fund investments", color: "#3b82f6", Icon: TrendingUp },
    { name: "Lumpsum Calculator", path: "/lumpsum-calculator", desc: "One-time investment growth projection", color: "#3b82f6", Icon: Wallet },
    { name: "EMI Calculator", path: "/emi-calculator", desc: "Home & Car loan EMI with amortization", color: "#10b981", Icon: Calculator },
    { name: "GST Calculator", path: "/gst-calculator", desc: "Add or remove GST instantly", color: "#f59e0b", Icon: Percent },
    { name: "Income Tax", path: "/income-tax-calculator", desc: "Compare Old vs New tax regime", color: "#ef4444", Icon: Scale },
    { name: "CAGR Calculator", path: "/cagr-calculator", desc: "Annualized investment growth rate", color: "#8b5cf6", Icon: BriefcaseBusiness },
    { name: "FD Calculator", path: "/fd-calculator", desc: "Fixed Deposit maturity returns", color: "#ec4899", Icon: PiggyBank },
    { name: "PPF Calculator", path: "/ppf-calculator", desc: "Tax-free Public Provident Fund", color: "#f59e0b", Icon: PiggyBank },
    { name: "Salary Hike", path: "/hike-calculator", desc: "Calculate your increment & new CTC", color: "#06b6d4", Icon: Briefcase },
];

export default function RelatedCalculators({ currentPath }: { currentPath: string }) {
    const related = allCalculators
        .filter((calc) => calc.path !== currentPath)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    return (
        <section className={styles.section}>
            <h3 className={styles.heading}>Also Try These Calculators</h3>
            <div className={styles.row}>
                {related.map((calc) => {
                    const IconComponent = calc.Icon;
                    return (
                        <Link key={calc.path} href={calc.path} className={styles.card}>
                            <div className={styles.iconBox} style={{ backgroundColor: `${calc.color}15` }}>
                                <IconComponent size={22} style={{ color: calc.color }} />
                            </div>
                            <div>
                                <h4 className={styles.cardTitle}>{calc.name}</h4>
                                <p className={styles.cardDesc}>{calc.desc}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
