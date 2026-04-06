import { NextResponse } from "next/server";

const UPSTREAM = "https://t-core.fit-hub.pro/Test/GetTariffs";

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream error" },
        { status: res.status },
      );
    }
    const data: unknown = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tariffs" },
      { status: 502 },
    );
  }
}
