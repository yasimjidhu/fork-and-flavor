import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import Recipe from "@/app/models/recipe";
import cloudinary from "@/config/cloudinary";

export async function POST(req: NextRequest) {
    await connectDB()

    const {
        name,
        ingredients,
        description,
        instructions,
        category,
        servings,
        prepTime,
        cookTime,
        difficulty,
        image
    } = await req.json();

    try {
        let imageUrl = ''

        // handle image upload if an image is provided
        if(image){
            const uploadResponse = await cloudinary.UploadStream.upload(image,{
                folder: "recipes", 
                use_filename: true, 
                unique_filename: true, 
            })

            imageUrl = uploadResponse.secure_url
        }
        const recipe = new Recipe({
            name,
            ingredients,
            description,
            instructions,
            category,
            servings,
            prepTime,
            cookTime,
            difficulty,
            image:imageUrl
        })

        await recipe.save()

        return NextResponse.json({message:'recipe added successfully'},{status:201})
    } catch (error:any) {
        return NextResponse.json({message:'failed to add recipe',error:error.message},{status:500})
    }
}