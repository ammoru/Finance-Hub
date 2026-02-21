"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styles from "@/components/calculator.module.css";

const COLORS = ["#f59e0b", "#10b981"]; // Orange & Green to match tax-saving themes

const formatCurrency = (val: number) => {
    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(val);
    return `Rs. ${formatted}`;
};

export default function PPFCalculatorClient() {
    // Current Indian Govt PPF limit is 1.5 Lakhs. Min is 500.
    const [yearlyInvestment, setYearlyInvestment] = useState(150000);
    const [years, setYears] = useState(15); // Standard lock-in is 15 years
    // PPF rate is fixed by govt. currently ~7.1%
    const rate = 7.1;

    const results = useMemo(() => {
        let currentBalance = 0;
        let totalInvested = 0;
        let totalInterest = 0;

        // PPF calculates interest yearly on the compounding balance
        // F = P [({(1+i)^n}-1)/i]  but iterative is more explicit for potential table generation later

        for (let i = 1; i <= years; i++) {
            totalInvested += yearlyInvestment;
            // Interest for the year = (Opening Balance + Installment) * rate
            const yearInterest = (currentBalance + yearlyInvestment) * (rate / 100);
            totalInterest += yearInterest;
            currentBalance += yearlyInvestment + yearInterest;
        }

        return {
            investedAmount: totalInvested,
            estReturns: totalInterest,
            totalValue: currentBalance,
        };
    }, [yearlyInvestment, years, rate]);

    const pieData = [
        { name: "Total Invested", value: results.investedAmount },
        { name: "Total Earned", value: results.estReturns },
    ];

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text">PPF</span> Calculator
                </h1>
                <p style={{ color: "var(--secondary-foreground)", fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
                    Calculate tax-free returns from the Public Provident Fund scheme.
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
                    <div className={styles.inputGroup} style={{ marginBottom: "2.5rem" }}>
                        <div className={styles.label}>
                            Yearly Investment (Rs.)
                            <span className={styles.value}>{formatCurrency(yearlyInvestment)}</span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="150000"
                            step="500"
                            value={yearlyInvestment}
                            onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                            className={styles.slider}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--secondary-foreground)", marginTop: "0.5rem" }}>
                            <span>Min: Rs. 500</span>
                            <span style={{ color: "var(--primary)" }}>Max: Rs. 1.5 Lakhs</span>
                        </div>
                    </div>

                    <div className={styles.inputGroup} style={{ marginBottom: "2.5rem" }}>
                        <div className={styles.label}>
                            Time Period
                            <span className={styles.value}>{years} Years</span>
                        </div>
                        <input
                            type="range"
                            min="15"
                            max="50"
                            step="5"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className={styles.slider}
                        />
                        <small style={{ color: "var(--secondary-foreground)", fontSize: "0.75rem", display: "block", marginTop: "0.5rem" }}>Standard Lock-in is 15 Years. Extendable in blocks of 5 years.</small>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Current Interest Rate
                            <span className={styles.value} style={{ backgroundColor: "color-mix(in srgb, var(--secondary) 30%, transparent)", color: "var(--secondary-foreground)" }}>
                                {rate}% p.a.
                            </span>
                        </div>
                        <small style={{ color: "var(--secondary-foreground)", fontSize: "0.75rem", display: "block", marginTop: "0.25rem" }}>Fixed by Govt of India.</small>
                    </div>

                    <div className={styles.results} style={{ marginTop: "2.5rem" }}>
                        <div className={styles.resultRow}>
                            <span>Total Investment</span>
                            <span className={styles.resultValue}>{formatCurrency(results.investedAmount)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Interest Earned <span style={{ fontSize: "0.7em", border: "1px solid #10b981", color: "#10b981", padding: "1px 4px", borderRadius: "10px", marginLeft: "4px" }}>Tax Free</span></span>
                            <span style={{ color: "var(--primary)" }} className={styles.resultValue}>{formatCurrency(results.estReturns)}</span>
                        </div>

                        <div className={`${styles.resultRow} ${styles.resultTotal}`} style={{ marginTop: "1.5rem", borderTop: "1px dashed var(--border)", paddingTop: "1rem" }}>
                            <strong>Maturity Amount</strong>
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
                        <h3 style={{ marginBottom: "2rem", color: "var(--foreground)" }}>Corpus Breakdown</h3>

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    animationDuration={800}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: any) => formatCurrency(Number(value))}
                                    wrapperStyle={{ outline: 'none' }}
                                    contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--foreground)' }} itemStyle={{ color: 'var(--foreground)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[0] }} /> Total Invested
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[1] }} /> Earned Interest
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
