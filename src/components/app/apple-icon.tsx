import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 120,
        background: "linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#0f172a",
        fontWeight: "bold",
        borderRadius: "20px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      R
    </div>,
    {
      ...size,
    },
  )
}
