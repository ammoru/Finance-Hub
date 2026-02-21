import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Dynamic params
        const title = searchParams.has("title")
            ? searchParams.get("title")?.slice(0, 100)
            : "Free Financial Calculator";

        const description = searchParams.has("description")
            ? searchParams.get("description")?.slice(0, 120)
            : "Plan your wealth with precision. 100% free, private, and fast.";

        return new ImageResponse(
            (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        padding: "80px 120px",
                        background: "linear-gradient(to bottom right, #020617, #0f172a)",
                        fontFamily: "Inter",
                    }}
                >
                    {/* Logo / Brand Name */}
                    <div
                        style={{
                            fontSize: 48,
                            fontWeight: 800,
                            color: "#3b82f6",
                            marginBottom: 40,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <span style={{ color: "#ffffff", marginRight: 10 }}>Finance</span>Hub
                    </div>

                    {/* Dynamic Page Title */}
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 800,
                            color: "#ffffff",
                            marginBottom: 24,
                            lineHeight: 1.1,
                            maxWidth: "900px",
                        }}
                    >
                        {title}
                    </div>

                    {/* Dynamic Description */}
                    <div
                        style={{
                            fontSize: 36,
                            fontWeight: 500,
                            color: "#94a3b8",
                            lineHeight: 1.4,
                            maxWidth: "800px",
                        }}
                    >
                        {description}
                    </div>

                    {/* Badge at Bottom */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "auto",
                            paddingTop: 40,
                        }}
                    >
                        <div
                            style={{
                                background: "#2563eb20",
                                color: "#60a5fa",
                                padding: "12px 24px",
                                borderRadius: 100,
                                fontSize: 24,
                                fontWeight: 600,
                            }}
                        >
                            100% Client-Side • No Data Stored
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
