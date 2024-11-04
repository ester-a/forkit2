import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick"; // Import Slider from react-slick


export function Recipes({ showAll = false }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipes from the JSON file
    async function fetchRecipes() {
      try {
        const response = await fetch("http://localhost:3000/recipes");
        const data = await response.json();
        console.log(data)
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;

    // If `showAll` is true, render all recipes as a single list
    if (showAll) {
        return (
          <div className="max-w-[1280px] mx-auto p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/recipe/${recipe.id}`}>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-md font-medium text-gray-800 mb-2">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-gray-600">⏱ {recipe.total_time}</p>
                </div>
                </Link>
              </div>
            ))}
          </div>
        );
      }
    
      // Default: Group recipes by category (original behavior)
      const categories = ["Breakfast", "Lunch", "Dinner", "Snack", "Salad"];
      const recipesByCategory = categories.reduce((acc, category) => {
        acc[category] = recipes.filter((recipe) => recipe.category === category);
        return acc;
      }, {});

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
                    <Link to={`/recipe/${recipe.id}`}>
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
                  </Link>
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



