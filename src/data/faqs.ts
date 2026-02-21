export const calculatorFAQs: Record<string, { question: string; answer: string }[]> = {
    sip: [
        { question: "What is SIP in Mutual Funds?", answer: "SIP (Systematic Investment Plan) is a method of investing a fixed sum regularly in a mutual fund scheme. It allows you to invest in a disciplined manner without worrying about market volatility and timing." },
        { question: "How much should I invest in SIP per month?", answer: "Financial advisors generally recommend investing at least 20-30% of your monthly income in SIPs. However, even starting with as low as Rs. 500 per month can help build wealth over time through the power of compounding." },
        { question: "Is SIP better than Fixed Deposit?", answer: "SIP in equity mutual funds has historically delivered higher returns (12-15% p.a.) compared to FDs (6-7% p.a.) over long periods. However, SIPs carry market risk while FDs offer guaranteed returns. The right choice depends on your risk appetite and investment horizon." },
        { question: "Can I stop my SIP anytime?", answer: "Yes, SIPs are completely flexible. You can pause, stop, or modify your SIP amount at any time without any penalty. There is no lock-in period for regular SIPs (except ELSS which has a 3-year lock-in)." },
    ],
    lumpsum: [
        { question: "What is a Lumpsum investment in Mutual Funds?", answer: "A Lumpsum investment means investing a large amount of money at one go in a mutual fund scheme, as opposed to investing small amounts periodically through SIPs." },
        { question: "When should I invest Lumpsum vs SIP?", answer: "Lumpsum investments work best when markets are at lower levels and you have a large corpus available. SIPs are better for regular income earners as they average out market volatility through rupee cost averaging." },
        { question: "What is the minimum Lumpsum investment in Mutual Funds?", answer: "Most mutual fund houses in India allow lumpsum investments starting from Rs. 1,000 to Rs. 5,000 depending on the scheme. There is no upper limit for lumpsum investments." },
        { question: "Is Lumpsum investment risky?", answer: "Lumpsum investments carry timing risk — if you invest when markets are at a peak, short-term returns may be negative. However, over long periods (7-10+ years), lumpsum investments in diversified equity funds have historically delivered strong returns." },
    ],
    emi: [
        { question: "What is EMI?", answer: "EMI stands for Equated Monthly Installment. It is the fixed amount you pay to a bank or financial institution on a specific date each month towards repaying your loan (home loan, car loan, personal loan, etc.)." },
        { question: "How is EMI calculated?", answer: "EMI is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P is the principal loan amount, R is the monthly interest rate, and N is the total number of monthly installments." },
        { question: "Can I reduce my EMI?", answer: "Yes, you can reduce your EMI by: (1) making prepayments to reduce the principal, (2) negotiating a lower interest rate with your bank, (3) extending the loan tenure, or (4) transferring your loan to a bank offering lower rates." },
        { question: "What happens if I miss an EMI payment?", answer: "Missing an EMI payment results in a late payment fee, negative impact on your credit score (CIBIL), and a potential increase in overall interest. Repeated defaults can lead to legal action by the lender." },
    ],
    gst: [
        { question: "What are the GST tax slabs in India?", answer: "India currently has four main GST rate slabs: 5%, 12%, 18%, and 28%. Additionally, there are special rates of 0.25% for rough diamonds and 3% for gold and silver. Essential items like food grains are exempt from GST (0%)." },
        { question: "What is the difference between CGST, SGST, and IGST?", answer: "CGST (Central GST) and SGST (State GST) are charged equally on intra-state transactions (within the same state). IGST (Integrated GST) is charged on inter-state transactions (between different states) and is equal to CGST + SGST." },
        { question: "How do I calculate GST from the total price?", answer: "To find the GST amount from a GST-inclusive price, use: GST Amount = Total Price - [Total Price × 100 / (100 + GST Rate)]. For example, if a product costs Rs. 1,180 including 18% GST, the GST amount is Rs. 180." },
        { question: "Who needs to register for GST?", answer: "Businesses with an annual turnover exceeding Rs. 40 lakhs (Rs. 20 lakhs for special category states) must register for GST. E-commerce operators and interstate suppliers must register regardless of turnover." },
    ],
    incomeTax: [
        { question: "What is the difference between Old and New Tax Regime?", answer: "The Old Tax Regime has higher tax rates but allows numerous deductions (80C, 80D, HRA, LTA). The New Tax Regime offers lower tax rates but eliminates most deductions and exemptions. The choice depends on your total deductions." },
        { question: "What is Section 87A rebate?", answer: "Section 87A provides a tax rebate for resident individuals. Under the New Tax Regime, if your taxable income is up to Rs. 7 lakhs, you get a full tax rebate (zero tax). Under the Old Regime, the rebate applies up to Rs. 5 lakhs." },
        { question: "Is the New Tax Regime better for everyone?", answer: "Not necessarily. If your total deductions (80C + 80D + HRA + LTA etc.) exceed Rs. 3-4 lakhs per year, the Old Tax Regime may result in lower tax. Our calculator helps you compare both regimes instantly." },
        { question: "What is Standard Deduction?", answer: "Standard Deduction is a flat Rs. 50,000 deduction available to all salaried employees under both Old and New Tax Regimes. It was introduced to replace the earlier transport allowance and medical reimbursement." },
    ],
    cagr: [
        { question: "What is CAGR and why is it important?", answer: "CAGR (Compound Annual Growth Rate) represents the smoothed annual rate of return an investment would have grown at if it had grown steadily. It's the best metric to compare investments across different time periods." },
        { question: "How is CAGR different from absolute returns?", answer: "Absolute return shows total percentage gain/loss without considering time. CAGR normalizes returns to an annual rate, making it possible to compare investments held for different durations fairly." },
        { question: "What is a good CAGR for investments?", answer: "A CAGR of 12-15% is considered excellent for equity investments in India. FDs typically deliver 6-7% CAGR, while gold delivers around 8-10% CAGR over long periods." },
        { question: "Can CAGR be negative?", answer: "Yes, CAGR can be negative if the final value of your investment is less than the initial value, indicating that you lost money on the investment over the given period." },
    ],
    fd: [
        { question: "What is a Fixed Deposit (FD)?", answer: "A Fixed Deposit is a financial instrument where you deposit a lump sum of money with a bank for a fixed tenure at a predetermined interest rate. It offers guaranteed, risk-free returns and is one of the safest investment options." },
        { question: "Is FD interest taxable?", answer: "Yes, interest earned on Fixed Deposits is fully taxable. Banks deduct TDS (Tax Deducted at Source) at 10% if interest exceeds Rs. 40,000 per year (Rs. 50,000 for senior citizens). You must declare the full interest in your ITR." },
        { question: "What is the difference between cumulative and non-cumulative FD?", answer: "In a Cumulative FD, interest is compounded and paid at maturity along with the principal. In a Non-Cumulative FD, interest is paid out periodically (monthly, quarterly, or yearly) while the principal is returned at maturity." },
        { question: "Can I break my FD before maturity?", answer: "Yes, most banks allow premature withdrawal of FDs with a penalty of 0.5% to 1% on the applicable interest rate. Some banks also offer sweep-in FDs linked to savings accounts for automatic liquidity." },
    ],
    ppf: [
        { question: "What is the current PPF interest rate?", answer: "The current PPF interest rate is 7.1% per annum, as set by the Ministry of Finance for the ongoing quarter. This rate is reviewed and potentially revised every quarter." },
        { question: "Is PPF completely tax-free?", answer: "Yes, PPF enjoys EEE (Exempt-Exempt-Exempt) tax status. Your investment (up to Rs. 1.5 lakhs under Section 80C), the interest earned, and the maturity amount are all completely tax-free." },
        { question: "Can I withdraw from PPF before 15 years?", answer: "Partial withdrawal is allowed from the 7th financial year onwards. You can withdraw up to 50% of the balance at the end of the 4th year or the preceding year, whichever is lower. Complete premature closure is only allowed in specific cases." },
        { question: "Can I extend my PPF account after 15 years?", answer: "Yes, PPF accounts can be extended in blocks of 5 years after the initial 15-year maturity. You can extend with or without further contributions, and the balance continues to earn interest." },
    ],
    hike: [
        { question: "What is a good salary hike percentage in India?", answer: "The average salary hike in India ranges from 8-12% annually. High performers may receive 15-25% hikes, while job switchers often negotiate 30-50% or higher increments depending on the industry and role." },
        { question: "How is salary hike percentage calculated?", answer: "Salary Hike % = [(New Salary - Old Salary) / Old Salary] × 100. For example, if your CTC increased from Rs. 10 LPA to Rs. 12 LPA, your hike percentage is [(12-10)/10] × 100 = 20%." },
        { question: "Does a higher CTC always mean higher in-hand salary?", answer: "Not necessarily. CTC includes components like PF, gratuity, insurance, and variable pay which don't directly add to monthly in-hand salary. A higher CTC with more variable components may result in a lower monthly take-home." },
        { question: "When should I expect a salary hike?", answer: "Most Indian companies conduct annual appraisals between March-June. Hikes are typically effective from April (start of the financial year). Some companies may also offer mid-year corrections or promotion-linked hikes." },
    ],
};
