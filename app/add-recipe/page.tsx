"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { useSession } from "next-auth/react";

const AddRecipe = () => {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [image, setImage] = useState<File | string | null>(null); // State for the image
    const [isUploading, setIsUploading] = useState(false); // Loading state for image upload
    const router = useRouter();

    const { data: session, status } = useSession()

    useEffect(() => {
        if (status == 'unauthenticated') {
            router.push('/auth/login')
        }
    }, [status, router])

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Recipe</h1>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Recipe Name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Short description of the recipe"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Ingredients</label>
                            <textarea
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="List the ingredients, separated by commas"
                                rows={4}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Instructions</label>
                            <textarea
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Step-by-step instructions"
                                rows={4}
                            />
                        </div>
                        {/* Image Upload Section */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Recipe Image</label>
                            <input
                                type="file"
                                accept="image/*"

                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                disabled={isUploading} // Disable the file input while uploading
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-yellow-500 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ${isUploading ? "cursor-not-allowed opacity-50" : ""}`}
                            disabled={isUploading} // Disable the submit button while uploading
                        >
                            {isUploading ? (
                                <span className="spinner-border spinner-border-sm"></span> // Show a loading spinner when uploading
                            ) : (
                                "Add Recipe"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddRecipe;
