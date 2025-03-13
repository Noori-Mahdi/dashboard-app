import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const product = await prisma.videoGameProduct.findMany();
    return NextResponse.json(
      { message: "successfully", data: product },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
