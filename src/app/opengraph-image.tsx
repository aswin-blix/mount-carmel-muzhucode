import { ImageResponse } from "next/og";
import { school } from "@/content/school";

export const alt = `${school.name}, ${school.place}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(180deg, #cfe4e3 0%, #e4efe6 50%, #fbe9b7 100%)",
          color: "#123b2c",
          position: "relative",
          padding: "70px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 140,
            top: 90,
            width: 300,
            height: 300,
            borderRadius: 300,
            background: "#f2b90c",
          }}
        />
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1600 600"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <path d="M0 380 C 200 330 360 330 520 350 S 820 300 960 230 S 1100 120 1180 140 S 1330 250 1450 290 S 1560 310 1600 315 V600 H0Z" fill="#5e9c74" />
          <path d="M0 455 C 220 405 420 425 620 440 S 1000 385 1240 420 S 1480 410 1600 425 V600 H0Z" fill="#2f7a4f" />
          <path d="M0 520 C 260 478 520 492 780 508 S 1220 470 1600 500 V600 H0Z" fill="#123b2c" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.9, letterSpacing: -4 }}>
          <span>Mount</span>
          <span>Carmel</span>
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#ffffff" }}>
          Matriculation Higher Secondary School, {school.place}
        </div>
      </div>
    ),
    size,
  );
}
