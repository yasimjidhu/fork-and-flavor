'use client';

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
    name: string;
    description: string;
    instructions: string[];
    ingredients: string[];
    category: string;
    servings: number;
    prepTime: string;
    cookTime: string;
    difficulty: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;
}

interface RecipeListingProps {
    recipes: Recipe[];
    title:string;
}

const RecipeListing: FC<RecipeListingProps> = ({ recipes,title }) => {

    return (
        <div className="">
            <h2 className="text-lg md:text-2xl font-bold text-center mb-2 mt-6 text-gray-800 font-primary xl:mt-14">
                {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe) => (
                    <Link href={`/recipes/${recipe._id}`} key={recipe._id}>
                        <div className="bg-white flex flex-col items-stretch h-full p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            {/* Image Section */}
                            <div className="relative max-h-48 w-full rounded-md overflow-hidden mb-4">
                                {recipe.image ? (
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.name}
                                        className="rounded-md object-cover"
                                        width={500}
                                        height={300}
                                        priority
                                    />
                                ) : (
                                    <div className="flex items-center justify-center bg-gray-200 h-full">
                                        <span className="text-gray-500">No Image Available</span>
                                    </div>
                                )}
                            </div>
                            {/* Recipe Name */}
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800 primary">
                                {recipe.name}
                            </h3>
                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 primary">
                                {recipe.description}
                            </p>
                            {/* Footer Section */}
                            <div className="flex justify-between items-center mt-auto">
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-yellow-600 transition-colors primary">
                                    View Recipe
                                </button>
                                <span className="text-sm text-gray-500 font-primary">
                                    {recipe.ingredients.length} Ingredients
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecipeListing;
