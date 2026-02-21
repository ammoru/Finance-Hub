"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, TrendingUp, BriefcaseBusiness, Percent, Scale, PiggyBank, Briefcase, Wallet } from "lucide-react";
import styles from "./page.module.css";

const calculators = [
  { id: "sip", name: "SIP Calculator", desc: "Plan your wealth creation through systematic investing.", icon: <TrendingUp className={styles.icon} size={28} />, path: "/sip-calculator", color: "#3b82f6" },
  { id: "lumpsum", name: "Lumpsum Calculator", desc: "Calculate your one-time investment future value.", icon: <Wallet className={styles.icon} size={28} />, path: "/lumpsum-calculator", color: "#3b82f6" },
  { id: "emi", name: "EMI Calculator", desc: "Calculate your home or car loan EMIs with amortization schedules.", icon: <Calculator className={styles.icon} size={28} />, path: "/emi-calculator", color: "#10b981" },
  { id: "gst", name: "GST Calculator", desc: "Instantly add or remove GST from your product pricing.", icon: <Percent className={styles.icon} size={28} />, path: "/gst-calculator", color: "#f59e0b" },
  { id: "tax", name: "Income Tax (India)", desc: "Calculate under Old vs New regime accurately.", icon: <Scale className={styles.icon} size={28} />, path: "/income-tax-calculator", color: "#ef4444" },
  { id: "cagr", name: "CAGR Calculator", desc: "Check the compounded annual growth rate of your returns.", icon: <BriefcaseBusiness className={styles.icon} size={28} />, path: "/cagr-calculator", color: "#8b5cf6" },
  { id: "fd", name: "FD Calculator", desc: "Know your maturity amount on Fixed Deposits instantly.", icon: <PiggyBank className={styles.icon} size={28} />, path: "/fd-calculator", color: "#ec4899" },
  { id: "ppf", name: "PPF Calculator", desc: "Calculate your tax-free Public Provident Fund returns.", icon: <PiggyBank className={styles.icon} size={28} />, path: "/ppf-calculator", color: "#f59e0b" },
  { id: "hike", name: "Salary Hike", desc: "Calculate your new compensation accurately.", icon: <Briefcase className={styles.icon} size={28} />, path: "/hike-calculator", color: "#06b6d4" },
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className={styles.main}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={styles.hero}
      >
        <span className={styles.badge}>Premium Financial Tools</span>
        <h1 className={styles.title}>
          Master Your Finances <br /> with <span className="gradient-text">Precision</span>
        </h1>
        <p className={styles.subtitle}>
          Free, beautifully designed, and instant browser-based calculators to help you plan your wealth, taxes, and investments.
        </p>
      </motion.div>

      <motion.div
        className={styles.gridContainer}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {calculators.map((calc) => (
          <Link href={calc.path} key={calc.id} className={styles.cardLink}>
            <motion.div
              variants={itemVariants as import("framer-motion").Variants}
              className={`premium-card ${styles.card}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.iconWrapper} style={{ backgroundColor: `${calc.color}15`, color: calc.color }}>
                {calc.icon}
              </div>
              <h3 className={styles.cardTitle}>{calc.name}</h3>
              <p className={styles.cardDesc}>{calc.desc}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
