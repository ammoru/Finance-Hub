import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sizeStr = searchParams.get("size");
    const size = sizeStr ? parseInt(sizeStr) : 512;

    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(to bottom right, #2563eb, #1e40af)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20%",
                }}
            >
                <div style={{ color: "white", fontSize: size * 0.55, fontWeight: 900, fontFamily: "sans-serif", marginTop: size * 0.05 }}>
                    F
                </div>
            </div>
        ),
        { width: size, height: size }
    );
}
