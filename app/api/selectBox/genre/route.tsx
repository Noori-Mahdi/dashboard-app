import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const genre = await prisma.genre.findMany();
    return NextResponse.json(
      { message: "successfully", data: genre },
      { status: 200 }
    );
  } catch (error) {}
}
