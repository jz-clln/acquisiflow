import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default async function AppleIcon() {
  const logo = await readFile(join(process.cwd(), "public/acquisiflow-symbol-light.png"));
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f7f9", alignItems: "center", justifyContent: "center" }}>
    {/* ImageResponse embeds the original brand asset directly. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`data:image/png;base64,${logo.toString("base64")}`} width={150} height={150} alt="" />
  </div>, size);
}
