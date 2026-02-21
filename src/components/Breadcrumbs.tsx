import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    // JSON-LD BreadcrumbList Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            ...(item.href ? { "item": `https://financehub.com${item.href}` } : {}),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.875rem" }}>
                <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0, flexWrap: "wrap", alignItems: "center" }}>
                    {items.map((item, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {index > 0 && <span style={{ color: "var(--secondary-foreground)", opacity: 0.5 }}>›</span>}
                            {item.href ? (
                                <Link href={item.href} style={{ color: "var(--primary)", textDecoration: "none" }}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span style={{ color: "var(--secondary-foreground)" }}>{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
