import { ImageResponse } from "next/og";

export const alt = "getKerja — Find your next career opportunity in Malaysia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background: "linear-gradient(135deg, #3b2fb8 0%, #7b3fa0 55%, #e8553e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 30, height: 30, background: "white", transform: "rotate(45deg)", borderRadius: 6 }} /></div>
          <div style={{ fontSize: 44, fontWeight: 700 }}>getKerja</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, maxWidth: 950 }}>Find Your Next Career Opportunity in Malaysia</div>
          <div style={{ fontSize: 30, opacity: 0.85 }}>Verified employers · Salary upfront · Apply in minutes</div>
        </div>
      </div>
    ),
    size,
  );
}
