"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "@/components/calculator.module.css";

const formatCurrency = (val: number) => {
    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(val);
    return `Rs. ${formatted}`;
};

export default function IncomeTaxCalculatorClient() {
    const [income, setIncome] = useState(1200000); // 12 Lakhs default
    const [deductions80c, setDeductions80c] = useState(150000); // Max 1.5L usually
    const [otherDeductions, setOtherDeductions] = useState(50000); // HRA, 80D, etc.

    const results = useMemo(() => {
        // Standard Deduction
        const standardDeduction = 50000;

        // Old Regime Logic
        let oldTaxable = Math.max(0, income - standardDeduction - deductions80c - otherDeductions);
        let oldTax = 0;

        if (oldTaxable > 250000) {
            if (oldTaxable <= 500000) {
                oldTax = (oldTaxable - 250000) * 0.05;
            } else if (oldTaxable <= 1000000) {
                oldTax = 12500 + (oldTaxable - 500000) * 0.20;
            } else {
                oldTax = 112500 + (oldTaxable - 1000000) * 0.30;
            }
        }

        // Old regime Section 87A rebate (Up to 5 lakhs taxable income)
        if (oldTaxable <= 500000) {
            oldTax = 0;
        } else {
            // Health and Education Cess 4%
            oldTax += oldTax * 0.04;
        }

        // New Regime Logic (Recent Slabs)
        // Note: New regime allows Standard Deduction of 50k now
        let newTaxable = Math.max(0, income - standardDeduction);
        let newTax = 0;

        if (newTaxable > 300000) {
            if (newTaxable <= 600000) {
                newTax = (newTaxable - 300000) * 0.05;
            } else if (newTaxable <= 900000) {
                newTax = 15000 + (newTaxable - 600000) * 0.10;
            } else if (newTaxable <= 1200000) {
                newTax = 45000 + (newTaxable - 900000) * 0.15;
            } else if (newTaxable <= 1500000) {
                newTax = 90000 + (newTaxable - 1200000) * 0.20;
            } else {
                newTax = 150000 + (newTaxable - 1500000) * 0.30;
            }
        }

        // New regime Section 87A rebate (Up to 7 lakhs taxable income)
        if (newTaxable <= 700000) {
            newTax = 0;
        } else {
            // Health and Education Cess 4%
            newTax += newTax * 0.04;
        }

        return {
            oldRegime: {
                taxable: oldTaxable,
                tax: Math.round(oldTax)
            },
            newRegime: {
                taxable: newTaxable,
                tax: Math.round(newTax)
            },
            winner: oldTax < newTax ? "Old Regime" : newTax < oldTax ? "New Regime" : "Both Equal",
            savings: Math.abs(oldTax - newTax)
        };
    }, [income, deductions80c, otherDeductions]);

    const chartData = [
        {
            name: "Tax Analysis",
            "Old Regime": results.oldRegime.tax,
            "New Regime": results.newRegime.tax,
        },
    ];

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text">Income Tax</span> Calculator
                </h1>
                <p style={{ color: "var(--secondary-foreground)", fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
                    Compare the Old Vs New Tax Regime and minimize your tax payout based on the latest Indian Government slabs.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem", width: "100%" }}>
                {/* Inputs Card */}
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Gross Annual Salary
                            <span className={styles.value}>{formatCurrency(income)}</span>
                        </div>
                        <input
                            type="range"
                            min="300000"
                            max="10000000"
                            step="50000"
                            value={income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Sec 80C Deductions (PPF, ELSS, etc)
                            <span className={styles.value}>{formatCurrency(deductions80c)}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="150000"
                            step="5000"
                            value={deductions80c}
                            onChange={(e) => setDeductions80c(Number(e.target.value))}
                            className={styles.slider}
                            style={{ background: "var(--secondary)" }}
                        />
                        <small style={{ color: "var(--secondary-foreground)", fontSize: "0.75rem", display: "block", marginTop: "0.5rem" }}>Applicable only in the Old Tax Regime.</small>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Other Deductions (HRA, 80D, etc)
                            <span className={styles.value}>{formatCurrency(otherDeductions)}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="500000"
                            step="10000"
                            value={otherDeductions}
                            onChange={(e) => setOtherDeductions(Number(e.target.value))}
                            className={styles.slider}
                            style={{ background: "var(--secondary)" }}
                        />
                        <small style={{ color: "var(--secondary-foreground)", fontSize: "0.75rem", display: "block", marginTop: "0.5rem" }}>Applicable only in the Old Tax Regime. Standard Deduction of 50k is Auto-Applied in both.</small>
                    </div>

                    {/* Recommendation Badge */}
                    <div style={{ marginTop: "3rem", padding: "1.5rem", borderRadius: "1rem", backgroundColor: results.winner === "Old Regime" ? "color-mix(in srgb, #f59e0b 15%, transparent)" : results.winner === "New Regime" ? "color-mix(in srgb, #10b981 15%, transparent)" : "color-mix(in srgb, var(--primary) 15%, transparent)", border: `1px solid ${results.winner === "Old Regime" ? "color-mix(in srgb, #f59e0b 30%, transparent)" : results.winner === "New Regime" ? "color-mix(in srgb, #10b981 30%, transparent)" : "var(--primary)"}` }}>
                        <h4 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", color: "var(--foreground)" }}>AI Recommendation</h4>
                        <p style={{ color: "var(--foreground)", fontSize: "0.9375rem", lineHeight: "1.5" }}>
                            {results.winner === "Both Equal" ?
                                `Both regimes yield the same exact tax of ${formatCurrency(results.newRegime.tax)}. The New Regime involves less paperwork since you don't need to declare proofs.`
                                :
                                `You should opt for the ${results.winner}. You will save exactly ${formatCurrency(results.savings)} by choosing the ${results.winner}.`
                            }
                        </p>
                    </div>

                </motion.div>

                {/* Comparison Card */}
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div className={styles.results} style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                        <h3 style={{ marginBottom: "1.5rem", color: "var(--foreground)", borderBottom: "1px dashed var(--border)", paddingBottom: "1rem" }}>Regime Breakdown</h3>

                        {/* Old Regime Row */}
                        <div style={{ marginBottom: "2rem" }}>
                            <div className={styles.resultRow} style={{ marginBottom: "0.5rem" }}>
                                <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Old Tax Regime</span>
                                <span style={{ fontWeight: 800, color: "#f59e0b", fontSize: "1.25rem" }}>{formatCurrency(results.oldRegime.tax)}</span>
                            </div>
                            <div className={styles.resultRow} style={{ fontSize: "0.875rem", marginBottom: 0 }}>
                                <span style={{ paddingLeft: "1rem", color: "var(--secondary-foreground)" }}>↳ Taxable Income</span>
                                <span style={{ color: "var(--secondary-foreground)" }}>{formatCurrency(results.oldRegime.taxable)}</span>
                            </div>
                        </div>

                        {/* New Regime Row */}
                        <div style={{ marginBottom: "2rem" }}>
                            <div className={styles.resultRow} style={{ marginBottom: "0.5rem" }}>
                                <span style={{ fontWeight: 600, color: "var(--foreground)" }}>New Tax Regime</span>
                                <span style={{ fontWeight: 800, color: "#10b981", fontSize: "1.25rem" }}>{formatCurrency(results.newRegime.tax)}</span>
                            </div>
                            <div className={styles.resultRow} style={{ fontSize: "0.875rem", marginBottom: 0 }}>
                                <span style={{ paddingLeft: "1rem", color: "var(--secondary-foreground)" }}>↳ Taxable Income</span>
                                <span style={{ color: "var(--secondary-foreground)" }}>{formatCurrency(results.newRegime.taxable)}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.chartContainer} style={{ width: "100%", height: 350, marginTop: "1rem" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--secondary-foreground)" tick={{ fill: 'var(--secondary-foreground)' }} />
                                <YAxis stroke="var(--secondary-foreground)" tick={{ fill: 'var(--secondary-foreground)' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    formatter={(value: any) => formatCurrency(Number(value))}
                                    cursor={{ fill: "color-mix(in srgb, var(--secondary) 50%, transparent)" }}
                                    contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--foreground)' }} itemStyle={{ color: 'var(--foreground)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                                <Bar dataKey="Old Regime" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={60} />
                                <Bar dataKey="New Regime" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={60} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
