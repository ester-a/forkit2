import { useState, useEffect } from "react";
// import recipes from '../../database/recipes.json'

// Define recipe categories (must match the categories in the recipe data)
const categories = ["Breakfast", "Lunch", "Dinner", "Snack", "Salad"];

export function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipes from the JSON file
    async function fetchRecipes() {
      try {
        const response = await fetch("../../database/recipes.json");
        const data = await response.json();
        setRecipes(data.recipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  // Group recipes by category
  const recipesByCategory = categories.reduce((acc, category) => {
    acc[category] = recipes.filter((recipe) => recipe.category === category);
    return acc;
  }, {});

  if (loading) return <p>Loading recipes...</p>;

  return (
    <>
      <div className="max-w-[1280px] mx-auto p-5">
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl text-gray-800 mb-4">
              {category}
            </h2>
            <div className="flex gap-4 overflow-x-auto">
              {recipesByCategory[category].map((recipe) => (
                <div
                  key={recipe.id}
                  className="min-w-[200px] max-w-[200px] bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">
                      {recipe.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ⏱ {recipe.total_time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Recipes;
