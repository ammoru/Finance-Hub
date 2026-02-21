import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProviderClient } from "@/components/ThemeProviderClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FinanceHub — Free Premium Financial Calculators for India",
    template: "%s | FinanceHub",
  },
  description: "Free online financial calculators for SIP, EMI, GST, Income Tax, FD, PPF, CAGR, Lumpsum, and Salary Hike. Calculate instantly in your browser — no data stored.",
  alternates: {
    canonical: "https://financehub.com",
  },
  keywords: ["SIP Calculator", "EMI Calculator", "GST Calculator", "Income Tax Calculator", "FD Calculator", "PPF Calculator", "CAGR Calculator", "Lumpsum Calculator", "Salary Hike Calculator", "Financial Calculator India"],
  authors: [{ name: "FinanceHub" }],
  creator: "FinanceHub",
  publisher: "FinanceHub",
  metadataBase: new URL("https://financehub.com"), // Replace with your real domain
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "FinanceHub",
    title: "FinanceHub — Free Premium Financial Calculators for India",
    description: "Calculate SIP, EMI, GST, Income Tax, FD, PPF, CAGR & more. 100% free, instant, and private — runs entirely in your browser.",
    url: "https://financehub.com",
    images: [
      {
        url: "/api/og?title=FinanceHub&description=Free+online+financial+calculators+for+India.+Calculated+privately+in+your+browser.",
        width: 1200,
        height: 630,
        alt: "FinanceHub - Free Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceHub — Free Premium Financial Calculators",
    description: "Calculate SIP, EMI, GST, Income Tax, FD, PPF, CAGR & more. 100% free and private.",
    creator: "@financehub",
    images: ["/api/og?title=FinanceHub&description=Free+online+financial+calculators+for+India.+Calculated+privately+in+your+browser."],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-site-verification-code", // Uncomment when you have it
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "FinanceHub",
  "url": "https://financehub.com",
  "description": "Free online financial calculators for India — SIP, EMI, GST, Income Tax, FD, PPF, CAGR, Lumpsum, and Salary Hike.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://financehub.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProviderClient>
          <Navbar />
          <main className="page-container">
            {children}
          </main>
          <Footer />
        </ThemeProviderClient>
        {/* Replace with your actual GA4 Measurement ID when deploying */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
