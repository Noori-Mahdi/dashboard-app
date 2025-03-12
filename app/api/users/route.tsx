import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        adminRole: true,
      },
    });

    return NextResponse.json(
      { messsage: "successfully", data: users },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
