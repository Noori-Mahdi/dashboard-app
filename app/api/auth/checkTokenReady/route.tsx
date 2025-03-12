import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  let token = cookieStore.get("token") as RequestCookie;
  if (token) {
    return NextResponse.json({ data: true });
  } else {
    return NextResponse.json({ data: false });
  }
}
