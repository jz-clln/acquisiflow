import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

const SITE_URL = "https://acquisiflow.com";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (
      !process.env.INDEXNOW_SECRET ||
      authHeader !== `Bearer ${process.env.INDEXNOW_SECRET}`
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const paths: string[] = Array.isArray(body.paths)
      ? body.paths
      : [];

    const urls = paths.map((path) => {
      if (path.startsWith("http")) {
        return path;
      }

      return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    });

    await submitToIndexNow(urls);

    return NextResponse.json({
      success: true,
      submitted: urls,
    });
  } catch (error) {
    console.error("IndexNow error:", error);

    return NextResponse.json(
      { error: "IndexNow submission failed." },
      { status: 500 }
    );
  }
}