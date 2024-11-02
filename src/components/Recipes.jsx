import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick"; // Import Slider from react-slick

export function Recipes({ showAll = false, searchTerm = "", filters = {} }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchRecipes() {
        try {
          const response = await fetch("/database/recipes.json");
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
  
  
  
    if (loading) return <p>Loading recipes...</p>;
  
    // Apply search and filters
    const filteredRecipes = recipes.filter((recipe) => {
      // Search filter: match by name or ingredient
      const matchesSearch = searchTerm
        ? recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true;
    
      // Filter based on diet flag (using boolean)
      const matchesDiet = filters.diet
        ? recipe[filters.diet] === true  // Filter by JSON key directly
        : true;
    
      // Filter by course category
      const matchesCourse = filters.course
        ? recipe.category && recipe.category.toLowerCase() === filters.course.toLowerCase()
        : true;
    
      // Filter based on protein flag (using boolean)
      const matchesProtein = filters.protein
        ? recipe[filters.protein] === true  // Filter by JSON key directly
        : true;
    
      // Method (if stored as a category or tag in your JSON, ensure match)
      const matchesMethod = filters.method
        ? recipe.method && recipe.method.toLowerCase() === filters.method.toLowerCase()
        : true;
    
      return matchesSearch && matchesDiet && matchesCourse && matchesProtein && matchesMethod;
    });
  
    if (showAll) {
      return (
        <div className="max-w-[1280px] mx-auto p-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link to={`/Explore/${recipe.id}`} key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-md font-medium text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-sm text-gray-600">⏱ {recipe.total_time}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  
    // If not `showAll`, render by category (original behavior)
    // ...
  }
  
  export default Recipes;
  



