"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styles from "@/components/calculator.module.css";

const COLORS = ["#3b82f6", "#10b981"]; // Blue and Green

const formatCurrency = (val: number) => {
    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(val);
    return `Rs. ${formatted}`;
};

export default function LumpsumCalculatorClient() {
    const [investment, setInvestment] = useState(500000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const results = useMemo(() => {
        const p = investment;
        const r = rate / 100;
        const t = years;

        // standard compounding for lumpsum A = P * (1 + R)^T
        const maturityValue = p * Math.pow((1 + r), t);
        const estReturns = maturityValue - p;

        return {
            investedAmount: p,
            estReturns,
            totalValue: maturityValue,
        };
    }, [investment, rate, years]);

    const pieData = [
        { name: "Total Investment", value: results.investedAmount },
        { name: "Est. Returns", value: results.estReturns },
    ];

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text">Lumpsum</span> Calculator
                </h1>
                <p style={{ color: "var(--secondary-foreground)", fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
                    Calculate the future value of a one-time upfront investment in Mutual Funds.
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
                            Total Investment
                            <span className={styles.value}>{formatCurrency(investment)}</span>
                        </div>
                        <input
                            type="range"
                            min="5000"
                            max="10000000"
                            step="5000"
                            value={investment}
                            onChange={(e) => setInvestment(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup} style={{ marginBottom: "2.5rem" }}>
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

                    <div className={styles.results} style={{ marginTop: "2.5rem" }}>
                        <div className={styles.resultRow}>
                            <span>Invested Amount</span>
                            <span className={styles.resultValue}>{formatCurrency(results.investedAmount)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Est. Returns</span>
                            <span style={{ color: "var(--primary)" }} className={styles.resultValue}>+{formatCurrency(results.estReturns)}</span>
                        </div>

                        <div className={`${styles.resultRow} ${styles.resultTotal}`} style={{ marginTop: "1.5rem", borderTop: "1px dashed var(--border)", paddingTop: "1rem" }}>
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
                                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[0] }} /> Invested Amount
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[1] }} /> Est. Returns
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
