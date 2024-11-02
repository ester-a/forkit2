import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function RecipeDetail() {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching recipe data
    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await fetch("/database/recipes.json");
                const data = await response.json();
                const foundRecipe = data.recipes.find(item => item.id === recipeId);
                if (foundRecipe) {
                    setRecipe(foundRecipe);
                } else {
                    setError("Recipe not found");
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
                setError("Failed to load recipe");
            } finally {
                setLoading(false);
            }
        }
        fetchRecipe();
    }, [recipeId]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;
    if (!recipe) return <div>No recipe available</div>;

    return (
        <div className="max-w-5xl mx-auto p-4">
            <button className="text-blue-500 mb-4" onClick={() => window.history.back()}>
                &lt; Back
            </button>
            <div className="flex flex-col md:flex-row mb-6">
                <div className="md:w-1/2 mb-4 md:mb-0">
                    <img src={recipe.image} alt={recipe.name} className="w-full h-auto rounded-lg" />
                </div>
                <div className="md:w-1/2 md:pl-6">
                    <h1 className="text-2xl font-bold">{recipe.name}</h1>
                    <p className="mt-2"><strong>Total Time:</strong> {recipe.total_time}</p>
                    <p><strong>Category:</strong> {recipe.category}</p>
                    <p><strong>Servings:</strong> {recipe.servings}</p>
                    <p><strong>Calories per Portion:</strong> {recipe.calories_per_portion}</p>

                    <div className="mt-4">
                        <h3 className="font-semibold">Nutritional Information</h3>
                        <ul className="list-disc pl-5">
                            {Object.entries(recipe.nutrition).map(([key, value]) => (
                                <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-semibold">Dietary Information</h3>
                        <ul className="list-disc pl-5">
                            {recipe.gluten_free && <li>Gluten Free: ✔️</li>}
                            {recipe.dairy_free && <li>Dairy Free: ✔️</li>}
                            {recipe.vegan && <li>Vegan: ✔️</li>}
                            {recipe.vegetarian && <li>Vegetarian: ✔️</li>}
                            {recipe.paleo && <li>Paleo: ✔️</li>}
                            {recipe.low_carb && <li>Low Carb: ✔️</li>}
                            {recipe.high_protein && <li>High Protein: ✔️</li>}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-bold">Ingredients</h2>
                <ul className="list-disc pl-5">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold">Instructions</h2>
                <ol className="list-decimal pl-5">
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold">Write a Comment</h2>
                <textarea
                    className="w-full h-24 p-2 border border-gray-300 rounded-md"
                    placeholder="Write your comment here..."
                />
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Send
                </button>
            </div>
        </div>
    );
}

export default RecipeDetail;
