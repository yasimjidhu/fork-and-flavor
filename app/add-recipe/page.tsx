"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { useSession } from "next-auth/react";

const AddRecipe = () => {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [image, setImage] = useState<File | string | null>(null);
    const [category, setCategory] = useState("");
    const [servings, setServings] = useState(0);
    const [prepTime, setPrepTime] = useState(0);
    const [cookTime, setCookTime] = useState(0);
    const [difficulty, setDifficulty] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const { data: session, status } = useSession()

    useEffect(() => {
        if (image) {

        }
    })
    useEffect(() => {
        if (status == 'unauthenticated') {
            router.push('/auth/login')
        }
    }, [status, router])

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsUploading(true);

        const formData = new FormData();

        // Add form fields to the FormData object
        formData.append("name", name);
        formData.append("ingredients", ingredients);
        formData.append("description", description);
        formData.append("instructions", instructions);
        formData.append("category", category);
        formData.append("servings", servings.toString());
        formData.append("prepTime", prepTime.toString());
        formData.append("cookTime", cookTime.toString());
        formData.append("difficulty", difficulty);

        // If an image is selected, append it to the FormData object
        if (image instanceof File) {
            formData.append("image", image);
        }

        try {
            const response = await fetch("/api/recipes", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // Redirect after successful recipe submission
                router.push("/");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Something went wrong!");
            }
        } catch (err) {
            setError("Error submitting recipe. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Recipe</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
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
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                disabled={isUploading}
                            />
                        </div>

                        {/* Additional Fields */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Recipe Category"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Servings</label>
                            <input
                                type="number"
                                value={servings}
                                onChange={(e) => setServings(Number(e.target.value))}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Number of servings"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Preparation Time (mins)</label>
                            <input
                                type="number"
                                value={prepTime}
                                onChange={(e) => setPrepTime(Number(e.target.value))}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Preparation time in minutes"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Cooking Time (mins)</label>
                            <input
                                type="number"
                                value={cookTime}
                                onChange={(e) => setCookTime(Number(e.target.value))}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Cooking time in minutes"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Difficulty</label>
                            <input
                                type="text"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Difficulty level (easy, medium, hard)"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-yellow-500 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ${isUploading ? "cursor-not-allowed opacity-50" : ""}`}
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : "Add Recipe"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddRecipe;
