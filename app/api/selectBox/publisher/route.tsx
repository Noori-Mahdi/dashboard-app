import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const publisher = await prisma.publisher.findMany();
    return NextResponse.json(
      { message: "successfully", data: publisher },
      { status: 200 }
    );
  } catch (error) {}
}
