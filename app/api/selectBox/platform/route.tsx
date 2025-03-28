import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const platform = await prisma.platform.findMany()
            return NextResponse.json(
              { message: "successfully", data: platform },
              { status: 200 }
            );
    } catch (error) {
        
    }
}