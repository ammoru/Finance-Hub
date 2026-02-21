"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styles from "@/components/calculator.module.css";

const COLORS = ["#f59e0b", "#10b981", "#3b82f6"];

const formatCurrency = (val: number) => {
    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 1, // Need precision for taxes
    }).format(val);
    return `Rs. ${formatted}`;
};

export default function GSTCalculatorClient() {
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(18); // Default 18% slab
    const [taxType, setTaxType] = useState<"exclusive" | "inclusive">("exclusive");

    const results = useMemo(() => {
        let netAmount = 0;
        let gstAmount = 0;
        let totalAmount = 0;

        if (taxType === "exclusive") {
            // "Add GST" -> Base Amount * Rate
            netAmount = amount;
            gstAmount = (amount * rate) / 100;
            totalAmount = amount + gstAmount;
        } else {
            // "Remove GST" -> Total Amount * (100 / (100+Rate))
            totalAmount = amount;
            gstAmount = amount - (amount * (100 / (100 + rate)));
            netAmount = amount - gstAmount;
        }

        return {
            netAmount,
            gstAmount,
            cgst: gstAmount / 2, // 50% split for Intra-state
            sgst: gstAmount / 2, // 50% split for Intra-state
            totalAmount,
        };
    }, [amount, rate, taxType]);

    const pieData = [
        { name: "Base Price", value: results.netAmount },
        { name: "CGST", value: results.cgst },
        { name: "SGST", value: results.sgst },
    ];

    const slabRates = [0.25, 3, 5, 12, 18, 28];

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text">GST</span> Calculator
                </h1>
                <p style={{ color: "var(--secondary-foreground)", fontSize: "1.125rem" }}>
                    Add or Remove GST instantly. (India Tax Slabs)
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

                    {/* Tax Type Toggle */}
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", backgroundColor: "var(--secondary)", padding: "0.5rem", borderRadius: "var(--radius-md)" }}>
                        <button
                            onClick={() => setTaxType("exclusive")}
                            style={{
                                flex: 1, padding: "0.75rem", borderRadius: "var(--radius-sm)", fontWeight: 600, transition: "0.3s",
                                backgroundColor: taxType === "exclusive" ? "var(--primary)" : "transparent",
                                color: taxType === "exclusive" ? "white" : "var(--foreground)"
                            }}
                        >
                            + Add GST
                        </button>
                        <button
                            onClick={() => setTaxType("inclusive")}
                            style={{
                                flex: 1, padding: "0.75rem", borderRadius: "var(--radius-sm)", fontWeight: 600, transition: "0.3s",
                                backgroundColor: taxType === "inclusive" ? "var(--primary)" : "transparent",
                                color: taxType === "inclusive" ? "white" : "var(--foreground)"
                            }}
                        >
                            - Remove GST
                        </button>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            {taxType === "exclusive" ? "Base Price (Before Tax)" : "Total Bill (Including Tax)"}
                            <span className={styles.value}>{formatCurrency(amount)}</span>
                        </div>
                        <input
                            type="range"
                            min="100"
                            max="500000"
                            step="100"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label} style={{ marginBottom: "1.5rem" }}>
                            GST Rate Bracket
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {slabRates.map((slab) => (
                                <button
                                    key={slab}
                                    onClick={() => setRate(slab)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        border: `1px solid ${rate === slab ? "var(--primary)" : "var(--border)"}`,
                                        borderRadius: "var(--radius-sm)",
                                        backgroundColor: rate === slab ? "color-mix(in srgb, var(--primary) 15%, transparent)" : "transparent",
                                        color: rate === slab ? "var(--primary)" : "var(--secondary-foreground)",
                                        fontWeight: 600,
                                        transition: "0.2s"
                                    }}
                                >
                                    {slab}%
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.results} style={{ marginTop: "2rem" }}>
                        <div className={styles.resultRow}>
                            <span>Base Amount (Net Price)</span>
                            <span className={styles.resultValue}>{formatCurrency(results.netAmount)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Total GST ({rate}%)</span>
                            <span className={styles.resultValue}>{formatCurrency(results.gstAmount)}</span>
                        </div>
                        <div className={styles.resultRow} style={{ fontSize: "0.9375rem" }}>
                            <span style={{ paddingLeft: "1rem" }}>↳ CGST ({rate / 2}%)</span>
                            <span style={{ color: "var(--secondary-foreground)" }}>{formatCurrency(results.cgst)}</span>
                        </div>
                        <div className={styles.resultRow} style={{ fontSize: "0.9375rem" }}>
                            <span style={{ paddingLeft: "1rem" }}>↳ SGST ({rate / 2}%)</span>
                            <span style={{ color: "var(--secondary-foreground)" }}>{formatCurrency(results.sgst)}</span>
                        </div>
                        <div className={`${styles.resultRow} ${styles.resultTotal}`} style={{ marginTop: "1.5rem", borderTop: "1px dashed var(--border)", paddingTop: "1rem" }}>
                            <strong>Final Bill Price</strong>
                            <strong>{formatCurrency(results.totalAmount)}</strong>
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
                        <h3 style={{ marginBottom: "2rem", color: "var(--foreground)" }}>Bill Breakdown</h3>
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
                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
                            {pieData.map((entry, index) => (
                                <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                    <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[index] }} />
                                    {entry.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
