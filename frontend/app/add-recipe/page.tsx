"use client";

import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";

const AddRecipe = () => {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newRecipe = { name, description, ingredients, instructions };
            await axiosInstance.post("/recipes", newRecipe);
            router.push("/");
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Recipe</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                        >
                            Add Recipe
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddRecipe;
