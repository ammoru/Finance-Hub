"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styles from "@/components/calculator.module.css";

const COLORS = ["#2563eb", "#10b981"];

const formatCurrency = (val: number) => {
    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(val);
    return `Rs. ${formatted}`;
};

export default function FDCalculatorClient() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(6.5);
    const [years, setYears] = useState(5);
    const [compoundingFreq, setCompoundingFreq] = useState<1 | 2 | 4 | 12>(4); // Default Quarterly

    const results = useMemo(() => {
        const p = principal;
        const r = rate / 100;
        const n = compoundingFreq;
        const t = years;

        // A = P(1 + r/n)^(n*t)
        const maturityAmount = p * Math.pow(1 + r / n, n * t);
        const totalInterest = maturityAmount - p;

        return {
            principal: p,
            totalInterest,
            maturityAmount,
        };
    }, [principal, rate, years, compoundingFreq]);

    const pieData = [
        { name: "Principal Amount", value: results.principal },
        { name: "Total Interest", value: results.totalInterest },
    ];

    const freqOptions = [
        { label: "Quarterly", value: 4 },
        { label: "Half-Yearly", value: 2 },
        { label: "Yearly", value: 1 },
        { label: "Monthly", value: 12 },
    ];

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text">FD</span> Calculator
                </h1>
                <p style={{ color: "var(--secondary-foreground)", fontSize: "1.125rem" }}>
                    Calculate Fixed Deposit Maturity & Returns.
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
                            Total Investment
                            <span className={styles.value}>{formatCurrency(principal)}</span>
                        </div>
                        <input
                            type="range"
                            min="10000"
                            max="10000000"
                            step="10000"
                            value={principal}
                            onChange={(e) => setPrincipal(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Rate of Interest (p.a)
                            <span className={styles.value}>{rate}%</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="15"
                            step="0.1"
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
                            max="25"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label} style={{ marginBottom: "1rem" }}>
                            Compounding Frequency
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {freqOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setCompoundingFreq(opt.value as 1 | 2 | 4 | 12)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        border: `1px solid ${compoundingFreq === opt.value ? "var(--primary)" : "var(--border)"}`,
                                        borderRadius: "var(--radius-sm)",
                                        backgroundColor: compoundingFreq === opt.value ? "color-mix(in srgb, var(--primary) 15%, transparent)" : "transparent",
                                        color: compoundingFreq === opt.value ? "var(--primary)" : "var(--secondary-foreground)",
                                        fontWeight: 600,
                                        transition: "0.2s"
                                    }}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.results} style={{ marginTop: "2rem" }}>
                        <div className={styles.resultRow}>
                            <span>Invested Amount</span>
                            <span className={styles.resultValue}>{formatCurrency(results.principal)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Est. Returns (Interest)</span>
                            <span style={{ color: "var(--primary)" }} className={styles.resultValue}>{formatCurrency(results.totalInterest)}</span>
                        </div>
                        <div className={`${styles.resultRow} ${styles.resultTotal}`} style={{ marginTop: "1.5rem", borderTop: "1px dashed var(--border)", paddingTop: "1rem" }}>
                            <strong>Maturity Value</strong>
                            <strong>{formatCurrency(results.maturityAmount)}</strong>
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
                        <h3 style={{ marginBottom: "2rem", color: "var(--foreground)" }}>Investment Breakdown</h3>
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
                                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[0] }} /> Principal Amount
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
