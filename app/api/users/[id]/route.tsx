import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // استخراج id از params

  if (!id) {
    return new NextResponse("User ID is required", { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: id },
    });

    return new NextResponse(`User deleted successfully`, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Failed to delete user", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // استخراج id از params

  if (!id) {
    return new NextResponse("User ID is required", { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        image: true,
        name: true,
        adminRole: true,
      },
    });

    return NextResponse.json(
      { message: `User get successfully`, data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Failed to delete user", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params; // استفاده از `context.params` برای استخراج id

    if (!id) {
      return NextResponse.json({
        message: "شناسه کاربر موردنیاز است",
        status: 400,
      });
    }

    const data = await req.json();
    const adminRole = data.adminRole as boolean;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ message: "کاربر یافت نشد", status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        adminRole,
      },
    });

    return NextResponse.json({
      message: "کاربر با موفقیت به‌روز شد.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("خطا در به‌روزرسانی کاربر:", error);
    return NextResponse.json({ message: "خطای داخلی سرور", status: 500 });
  }
}
