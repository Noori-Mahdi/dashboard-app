import { decodeToken } from "@/helper/authentication";
import { PrismaClient } from "@prisma/client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("token") as RequestCookie;

    if (!token)
      return new NextResponse("Authorization required1", { status: 401 });

    const tokenValue = token.value;
    const decodedToken: any = jwt.verify(tokenValue, "my secret");
    if (!decodedToken)
      return new NextResponse("Authorization required2", { status: 401 });
    const user = await prisma.user.findFirst({
      where: {
        id: String(decodedToken.id),
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        adminRole: true,
      },
    });
    return NextResponse.json({ data: user });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
