import { connectDB } from "@/utils/mongodb";
import Recipe from "@/app/models/recipe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Extract the search query from the request URL
    const { search } = Object.fromEntries(req.nextUrl.searchParams.entries());

    if (!search) {
      return NextResponse.json(
        { message: "Search query is required" },
        { status: 400 }
      );
    }

    // Search for recipes with a case-insensitive match in the `title` or `category`
    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });

    // Return the search results
    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error: unknown) {
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
