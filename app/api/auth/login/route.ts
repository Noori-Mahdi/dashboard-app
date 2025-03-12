import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { encodeToken } from "@/helper/authentication";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface ILoginBody {
  email: string;
  password: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data: ILoginBody = await req.json();

    if (!data.email && !data.password) {
      return new NextResponse("please fill all the fields", { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const value = await bcrypt.compare(data.password, user.password);

    if (!value) {
      return new NextResponse("Pasword not valid", { status: 400 });
    }

    const tokenData = {
      id: user.id,
    };

    const token = await jwt.sign(tokenData, "my secret", {
      expiresIn: "1d",
    });
    // const token = await encodeToken(user.id);

    return new NextResponse("User logged in successfully", {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/ `,
      },
    });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
