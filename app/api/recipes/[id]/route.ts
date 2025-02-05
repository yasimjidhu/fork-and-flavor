import Recipe from "@/app/models/recipe";
import { connectDB } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  try {

    const { id } =   await params

    if (!id) {
      return NextResponse.json(
        { message: "id parameter is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const recipes = await Recipe.findById(id)

    if (recipes.length === 0) {
      return NextResponse.json(
        { message: `No recipes found for id: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error: unknown) {
    console.log('Error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Failed to fetch recipes', error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: 'An unknown error occurred', error: 'Unknown error' },
        { status: 500 }
      );
    }

  }
}
