import Recipe from "@/app/models/recipe";
import { connectDB } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { category: string } }) {
  try {

    const { category } = params
    console.log('category in bakcend',category)

    if (!category) {
      return NextResponse.json(
        { message: "Category parameter is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const recipes = await Recipe.find({ category });

    if (recipes.length === 0) {
      return NextResponse.json(
        { message: `No recipes found for category: ${category}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error: any) {
    console.log('Error:', error);

    return NextResponse.json(
      { message: 'Failed to fetch recipes', error: error.message },
      { status: 500 }
    );
  }
}
