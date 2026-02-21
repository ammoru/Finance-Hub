"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import styles from "@/components/calculator.module.css";

// Lazy Load Heavy Chart Library to improve Core Web Vitals
const DynamicSIPPieChart = dynamic(
    () => import("@/components/charts/SIPPieChart"),
    { ssr: false, loading: () => <p style={{ color: "var(--secondary-foreground)", marginTop: "1rem" }}>Loading Chart...</p> }
);

const COLORS = ["#2563eb", "#10b981"];

const formatCurrency = (val: number) => {
    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(val);
    return `Rs. ${formatted}`;
};

export default function SIPCalculatorClient({ bankName }: { bankName?: string }) {
    const [investment, setInvestment] = useState(25000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    // Math calculation logic
    const results = useMemo(() => {
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;
        const investedAmount = investment * months;

        // M = P * ( (1+i)^n - 1 ) / i * (1+i)
        const futureValue =
            investment *
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate);

        const estReturns = futureValue - investedAmount;

        return {
            investedAmount,
            estReturns,
            totalValue: futureValue,
        };
    }, [investment, rate, years]);

    const pieData = [
        { name: "Invested Amount", value: results.investedAmount },
        { name: "Est. Returns", value: results.estReturns },
    ];

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                    {bankName ? (
                        <><span className="gradient-text">{bankName}</span> SIP Calculator</>
                    ) : (
                        <><span className="gradient-text">SIP</span> Calculator</>
                    )}
                </h1>
                <p style={{ color: "var(--secondary-foreground)", fontSize: "1.125rem" }}>
                    Estimate your wealth creation over time.
                </p>
            </div>

            <div className={styles.calcGrid}>
                {/* Sliders Card */}
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Monthly Investment
                            <span className={styles.value}>{formatCurrency(investment)}</span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="100000"
                            step="500"
                            value={investment}
                            onChange={(e) => setInvestment(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Expected Return Rate (p.a)
                            <span className={styles.value}>{rate}%</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="0.5"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Time Period
                            <span className={styles.value}>{years} Years</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="40"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.results}>
                        <div className={styles.resultRow}>
                            <span>Invested Amount</span>
                            <span className={styles.resultValue}>{formatCurrency(results.investedAmount)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Est. Returns</span>
                            <span className={styles.resultValue}>{formatCurrency(results.estReturns)}</span>
                        </div>
                        <div className={`${styles.resultRow} ${styles.resultTotal}`} style={{ marginTop: "2rem", borderTop: "1px dashed var(--border)", paddingTop: "1rem" }}>
                            <strong>Total Value</strong>
                            <strong>{formatCurrency(results.totalValue)}</strong>
                        </div>
                    </div>
                </motion.div>

                {/* Visualizer Card */}
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.chartContainer}>
                        <h3 style={{ marginBottom: "2rem", color: "var(--foreground)" }}>Wealth Breakdown</h3>
                        <div style={{ width: "100%", height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <DynamicSIPPieChart data={pieData} />
                        </div>
                        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[0] }} /> Invested
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[1] }} /> Retruns
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
