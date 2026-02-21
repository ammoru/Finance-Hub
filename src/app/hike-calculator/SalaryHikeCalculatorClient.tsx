"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styles from "@/components/calculator.module.css";

const COLORS = ["#06b6d4", "#10b981"];

const formatCurrency = (val: number) => {
    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(val);
    return `Rs. ${formatted}`;
};

export default function SalaryHikeCalculatorClient() {
    const [mode, setMode] = useState<"percentage" | "amount">("percentage");

    // Inputs
    const [currentCTC, setCurrentCTC] = useState(1000000); // 10 LPA Default
    const [hikePercentage, setHikePercentage] = useState(15);
    const [newCTC, setNewCTC] = useState(1150000);

    const results = useMemo(() => {
        let calculatedNewCTC = 0;
        let calculatedHikePercentage = 0;
        let incrementAmount = 0;

        if (mode === "percentage") {
            incrementAmount = (currentCTC * hikePercentage) / 100;
            calculatedNewCTC = currentCTC + incrementAmount;
            calculatedHikePercentage = hikePercentage;
        } else {
            incrementAmount = newCTC - currentCTC;
            // Formula: [(New - Old) / Old] * 100
            calculatedHikePercentage = currentCTC > 0 ? (incrementAmount / currentCTC) * 100 : 0;
            calculatedNewCTC = newCTC;
        }

        return {
            incrementAmount,
            newCTC: calculatedNewCTC,
            hikePercentage: parseFloat(calculatedHikePercentage.toFixed(2)),
            currentMonthly: Math.round(currentCTC / 12),
            newMonthly: Math.round(calculatedNewCTC / 12),
            monthlyIncrement: Math.round(incrementAmount / 12),
        };
    }, [mode, currentCTC, hikePercentage, newCTC]);

    const pieData = [
        { name: "Current Salary", value: Math.max(0, currentCTC) },
        { name: "Salary Increment", value: Math.max(0, results.incrementAmount) },
    ];

    // Ensure state updates to sliders are logical
    const handleSliderChange = (type: string, value: number) => {
        if (type === "current") setCurrentCTC(value);
        if (type === "hike") setHikePercentage(value);
        if (type === "new") setNewCTC(value);
    };

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text">Salary Hike</span> Calculator
                </h1>
                <p style={{ color: "var(--secondary-foreground)", fontSize: "1.125rem" }}>
                    Calculate your exact increment amount and monthly take-home.
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
                    {/* Calculation Mode Toggle */}
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", backgroundColor: "var(--secondary)", padding: "0.5rem", borderRadius: "var(--radius-md)" }}>
                        <button
                            onClick={() => setMode("percentage")}
                            style={{
                                flex: 1, padding: "0.75rem", borderRadius: "var(--radius-sm)", fontWeight: 600, transition: "0.3s",
                                backgroundColor: mode === "percentage" ? "var(--primary)" : "transparent",
                                color: mode === "percentage" ? "white" : "var(--foreground)"
                            }}
                        >
                            I Know % Hike
                        </button>
                        <button
                            onClick={() => setMode("amount")}
                            style={{
                                flex: 1, padding: "0.75rem", borderRadius: "var(--radius-sm)", fontWeight: 600, transition: "0.3s",
                                backgroundColor: mode === "amount" ? "var(--primary)" : "transparent",
                                color: mode === "amount" ? "white" : "var(--foreground)"
                            }}
                        >
                            I Know New Salary
                        </button>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Current Salary / CTC
                            <span className={styles.value}>{formatCurrency(currentCTC)}</span>
                        </div>
                        <input
                            type="range"
                            min="100000"
                            max="5000000"
                            step="50000"
                            value={currentCTC}
                            onChange={(e) => handleSliderChange("current", Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    {mode === "percentage" ? (
                        <div className={styles.inputGroup}>
                            <div className={styles.label}>
                                Expected Hike (%)
                                <span className={styles.value}>{hikePercentage}%</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                step="1"
                                value={hikePercentage}
                                onChange={(e) => handleSliderChange("hike", Number(e.target.value))}
                                className={styles.slider}
                            />
                        </div>
                    ) : (
                        <div className={styles.inputGroup}>
                            <div className={styles.label}>
                                New Offered Salary / CTC
                                <span className={styles.value}>{formatCurrency(newCTC)}</span>
                            </div>
                            <input
                                type="range"
                                min={Math.max(100000, currentCTC)}
                                max={currentCTC * 3 || 10000000}
                                step="50000"
                                value={newCTC}
                                onChange={(e) => handleSliderChange("new", Number(e.target.value))}
                                className={styles.slider}
                            />
                        </div>
                    )}

                    <div className={styles.results} style={{ marginTop: "2rem" }}>
                        <div className={styles.resultRow} style={{ borderBottom: "1px dashed var(--border)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                            <span>Total Hike Earned ({results.hikePercentage}%)</span>
                            <span style={{ color: "var(--primary)" }}>+{formatCurrency(results.incrementAmount)}</span>
                        </div>

                        <div className={styles.resultRow}>
                            <span>Current Monthly Salary</span>
                            <span className={styles.resultValue}>{formatCurrency(results.currentMonthly)} /mo</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>New Monthly Salary</span>
                            <span className={styles.resultValue}>{formatCurrency(results.newMonthly)} /mo</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Monthly Increment</span>
                            <span className={styles.resultValue} style={{ color: "#10b981" }}>+{formatCurrency(results.monthlyIncrement)} /mo</span>
                        </div>

                        <div className={`${styles.resultRow} ${styles.resultTotal}`} style={{ marginTop: "1.5rem", borderTop: "1px dashed var(--border)", paddingTop: "1rem" }}>
                            <strong>New Total Salary</strong>
                            <strong>{formatCurrency(results.newCTC)}</strong>
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
                        <h3 style={{ marginBottom: "2rem", color: "var(--foreground)" }}>Salary Breakdown</h3>

                        {results.incrementAmount >= 0 ? (
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
                                        <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[0] }} /> Current Salary
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                        <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[1] }} /> Hike Amount
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", padding: "2rem" }}>
                                <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>⚠️</div>
                                <h4 style={{ color: "#ef4444", fontSize: "1.25rem", marginBottom: "0.5rem" }}>Pay Cut Detected</h4>
                                <p style={{ color: "var(--secondary-foreground)" }}>The new salary is lower than the current salary, representing a decrease in compensation.</p>
                            </div>
                        )}

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
