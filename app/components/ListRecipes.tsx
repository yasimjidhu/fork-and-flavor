import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
    id: string;
    name: string;
    image: string;
    description: string;
    ingredients: string[];
    instructions: string[];
}

interface RecipeListingProps {
    recipes: Recipe[];
}

const RecipeListing: FC<RecipeListingProps> = ({ recipes }) => {
    return (
        <div className="mt-10 p-10 bg-gray-50 rounded-xl shadow-lg">
            <h2 className="text-4xl primary font-bold text-center mb-6">
                Explore Our Delicious Recipes
            </h2>
            <div className="grid grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <Link href={`/recipes/${recipe.id}`} key={recipe.id}>

                        <div
                            key={recipe.id}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <div className="relative h-48 w-full rounded-md overflow-hidden mb-4">
                                {recipe.image && (
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.name}
                                        className="rounded-md object-cover"
                                        width={500}
                                        height={300}
                                        layout="responsive"
                                    />
                                )}
                            </div>
                            <h3 className="text-2xl primary font-semibold mb-2">
                                {recipe.name}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {recipe.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-full font-medium shadow-sm hover:bg-yellow-600 transition-colors">
                                    View Recipe
                                </button>
                                <span className="text-sm text-gray-500">
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