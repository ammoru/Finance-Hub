import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
                <div style={{ color: "white", fontSize: 100, fontWeight: 900, fontFamily: "sans-serif", marginTop: 10 }}>
                    F
                </div>
            </div>
        ),
        { ...size }
    );
}
