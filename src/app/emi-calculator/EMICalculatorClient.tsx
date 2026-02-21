"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styles from "@/components/calculator.module.css";

const COLORS = ["#10b981", "#ef4444"];

const formatCurrency = (val: number) => {
    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(val);
    return `Rs. ${formatted}`;
};

export default function EMICalculatorClient() {
    const [principal, setPrincipal] = useState(5000000);
    const [rate, setRate] = useState(8.5);
    const [years, setYears] = useState(20);

    const { results, schedule } = useMemo(() => {
        const p = principal;
        const r = rate / 12 / 100;
        const n = years * 12;

        let emi = 0;
        let totalInterest = 0;
        let totalPayment = 0;

        // Amortization Schedule
        const amortization = [];
        let balance = p;

        if (r === 0) {
            emi = p / n;
            totalPayment = p;
            totalInterest = 0;

            for (let y = 1; y <= years; y++) {
                const principalPaid = emi * 12;
                balance -= principalPaid;
                amortization.push({ year: y, principal: principalPaid, interest: 0, balance: Math.max(0, balance) });
            }
        } else {
            emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            totalPayment = emi * n;
            totalInterest = totalPayment - p;

            let prevBalance = p;
            for (let y = 1; y <= years; y++) {
                let yPrincipal = 0;
                let yInterest = 0;
                for (let m = 1; m <= 12; m++) {
                    const mInterest = prevBalance * r;
                    const mPrincipal = emi - mInterest;
                    yInterest += mInterest;
                    yPrincipal += mPrincipal;
                    prevBalance -= mPrincipal;
                }
                amortization.push({
                    year: y,
                    principal: yPrincipal,
                    interest: yInterest,
                    balance: Math.max(0, prevBalance)
                });
            }
        }

        return {
            results: {
                emi,
                principal: p,
                totalInterest,
                totalPayment,
            },
            schedule: amortization
        };
    }, [principal, rate, years]);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("EMI Amortization Schedule", 14, 15);

        doc.setFontSize(10);
        doc.text(`Principal: ${formatCurrency(principal)}`, 14, 25);
        doc.text(`Rate: ${rate}% p.a.`, 14, 32);
        doc.text(`Tenure: ${years} Years`, 14, 39);
        doc.text(`Monthly EMI: ${formatCurrency(results.emi)}`, 14, 46);

        const tableColumn = ["Year", "Principal Paid", "Interest Paid", "Total Payment", "Balance Remaining"];
        const tableRows: any[] = [];

        schedule.forEach(row => {
            const rowData = [
                `Year ${row.year}`,
                formatCurrency(row.principal),
                formatCurrency(row.interest),
                formatCurrency(row.principal + row.interest),
                formatCurrency(row.balance)
            ];
            tableRows.push(rowData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 55,
        });

        doc.save(`emi-schedule-${principal}-${years}yr.pdf`);
    };

    const pieData = [
        { name: "Principal Amount", value: results.principal },
        { name: "Interest Amount", value: results.totalInterest },
    ];

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text">EMI</span> Calculator
                </h1>
                <p style={{ color: "var(--secondary-foreground)", fontSize: "1.125rem" }}>
                    Calculate your Home, Car, and Personal Loan Installments instantly.
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
                            Principal Amount Loan
                            <span className={styles.value}>{formatCurrency(principal)}</span>
                        </div>
                        <input
                            type="range"
                            min="100000"
                            max="50000000"
                            step="50000"
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
                            max="20"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.label}>
                            Loan Tenure
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

                    <div className={styles.results}>
                        <div className={styles.resultRow}>
                            <span>Monthly EMI</span>
                            <span className={styles.resultValue}>{formatCurrency(results.emi)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Principal Amount</span>
                            <span className={styles.resultValue}>{formatCurrency(results.principal)}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span>Total Interest</span>
                            <span style={{ color: "var(--primary)" }} className={styles.resultValue}>{formatCurrency(results.totalInterest)}</span>
                        </div>
                        <div className={`${styles.resultRow} ${styles.resultTotal}`} style={{ marginTop: "2rem", borderTop: "1px dashed var(--border)", paddingTop: "1rem" }}>
                            <strong>Total Payment</strong>
                            <strong>{formatCurrency(results.totalPayment)}</strong>
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
                        <h3 style={{ marginBottom: "2rem", color: "var(--foreground)" }}>Payment Breakdown</h3>
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
                        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[0] }} /> Principal Loan
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--secondary-foreground)" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: COLORS[1] }} /> Total Interest
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Amortization Table */}
            <motion.div
                className={styles.tableContainer}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Yearly Amortization Schedule</h3>
                    <button
                        onClick={exportToPDF}
                        style={{ padding: "0.5rem 1rem", backgroundColor: "var(--primary)", color: "white", borderRadius: "var(--radius-sm)", fontWeight: 600, fontSize: "0.875rem", transition: "transform 0.2s" }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        Download PDF
                    </button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Principal Paid</th>
                            <th>Interest Paid</th>
                            <th>Total Payment</th>
                            <th>Balance Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((row) => (
                            <tr key={row.year}>
                                <td>Year {row.year}</td>
                                <td>{formatCurrency(row.principal)}</td>
                                <td style={{ color: "var(--primary)" }}>{formatCurrency(row.interest)}</td>
                                <td>{formatCurrency(row.principal + row.interest)}</td>
                                <td>{formatCurrency(row.balance)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
