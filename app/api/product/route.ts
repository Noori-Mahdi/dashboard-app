import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newGame = await prisma.videoGameProduct.create({
      data: {
        title: body.title,
        description: body.description,
        playerCount: 0,
        releaseDate: body.releaseDate,
        developer: body.developer,
        coverImageUrl: body.coverImageUrl || "",
      },
    });

    if (body.genre && Array.isArray(body.genre)) {
      await prisma.videoGameProductGenre.createMany({
        data: body.genre.map((genre: { id: string; name: string }) => ({
          videoGameProductId: newGame.id,
          genreId: genre.id,
        })),
      });
      console.log("Genres added successfully");
    }

    if (body.platform && Array.isArray(body.platform)) {
      await prisma.videoGameProductPlatform.createMany({
        data: body.platform.map((platform: { id: string; name: string }) => ({
          videoGameProductId: newGame.id,
          platformId: platform.id,
        })),
      });
      console.log("Platforms added successfully");
    }

    if (body.publisher && Array.isArray(body.publisher)) {
      await prisma.videoGameProductPublisher.createMany({
        data: body.publisher.map((publisher: { id: string; name: string }) => ({
          videoGameProductId: newGame.id,
          publisherId: publisher.id,
        })),
      });
      console.log("Publishers added successfully");
    }

    return NextResponse.json({ message: "Game added successfully", newGame });
  } catch (error) {
    console.error("Error adding game:", error);
    return NextResponse.json(
      { message: "Error 500: Unable to add game", error },
      { status: 500 }
    );
  }
}
