import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface IRegisterBody {
  email: string;
  password: string;
  userName: string;
}

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data: IRegisterBody = await req.json();

    if (!data.email || !data.password || !data.userName) {
      return new NextResponse("please fill all the fields", { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (user) return new NextResponse("user already exists", { status: 400 });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.userName,
      },
    });

    return new NextResponse("user created successfully", { status: 201 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
