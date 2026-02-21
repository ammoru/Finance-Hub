"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styles from "@/components/calculator.module.css";

const COLORS = ["#8b5cf6", "#10b981"];

const formatCurrency = (val: number) => {
    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(val);
    return `Rs. ${formatted}`;
};

export default function CAGRCalculatorClient() {
    const [initialValue, setInitialValue] = useState(100000);
    const [finalValue, setFinalValue] = useState(500000);
    const [years, setYears] = useState(5);

    const results = useMemo(() => {
        // Ensure values are logically positive
        if (initialValue <= 0 || finalValue <= 0 || years <= 0) {
            return { cagr: 0, absoluteReturn: 0, profit: 0 };
        }

        // CAGR Formula: ( (Final / Initial) ^ (1 / Years) ) - 1
        const ratio = finalValue / initialValue;
        const cagrVal = (Math.pow(ratio, 1 / years) - 1) * 100;

        // Absolute return percentage
        const absReturn = ((finalValue - initialValue) / initialValue) * 100;

        return {
            cagr: cagrVal,
            absoluteReturn: absReturn,
            profit: finalValue - initialValue
        };
    }, [initialValue, finalValue, years]);

    const pieData = [
        { name: "Initial Investment", value: initialValue },
        { name: "Profit Earned", value: Math.max(0, results.profit) },
    ];

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text">CAGR</span> Calculator
                </h1>
                <p style={{ color: "var(--secondary-foreground)", fontSize: "1.125rem" }}>
                    Find the annualized growth rate of your investment.
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
                            Initial Investment Value
                            <span className={styles.value}>{formatCurrency(initialValue)}</span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="1000000"
                            step="1000"
                            value={initialValue}
                            onChange={(e) => setInitialValue(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Final Output Value
                            <span className={styles.value}>{formatCurrency(finalValue)}</span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="5000000"
                            step="1000"
                            value={finalValue}
                            onChange={(e) => setFinalValue(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Duration / Time Period
                            <span className={styles.value}>{years} Years</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.results} style={{ marginTop: "2rem" }}>
                        <div className={styles.resultRow}>
                            <span>Initial Value</span>
                            <span className={styles.resultValue}>{formatCurrency(initialValue)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Final Value</span>
                            <span className={styles.resultValue}>{formatCurrency(finalValue)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Absolute Return</span>
                            <span className={styles.resultValue} style={{ color: results.absoluteReturn >= 0 ? "#10b981" : "#ef4444" }}>
                                {results.absoluteReturn.toFixed(2)}%
                            </span>
                        </div>

                        <div className={`${styles.resultRow} ${styles.resultTotal}`} style={{ marginTop: "1.5rem", borderTop: "1px dashed var(--border)", paddingTop: "1rem" }}>
                            <strong>CAGR</strong>
                            <strong style={{ color: results.cagr >= 0 ? "var(--primary)" : "#ef4444" }}>{results.cagr.toFixed(2)}% p.a.</strong>
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
                        <h3 style={{ marginBottom: "2rem", color: "var(--foreground)" }}>Value Breakdown</h3>

                        {/* If they lose money, don't show the confusing overlapping pie chart */}
                        {results.profit >= 0 ? (
                            <>
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
                                        <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[0] }} /> Initial Investment
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                        <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[1] }} /> Profit Made
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", padding: "2rem" }}>
                                <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>📉</div>
                                <h4 style={{ color: "#ef4444", fontSize: "1.25rem", marginBottom: "0.5rem" }}>Negative Returns</h4>
                                <p style={{ color: "var(--secondary-foreground)" }}>This investment resulted in a capital loss of {formatCurrency(Math.abs(results.profit))}. The CAGR is negative.</p>
                            </div>
                        )}

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
