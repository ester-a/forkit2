import { Link } from "react-router-dom";

export function RecipeCard({ recipe }) {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Link to={`/recipe/${recipe.recipes__id}`}>
          <img
            src={recipe.recipes__image}
            alt={recipe.recipes__name}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="text-md font-medium text-gray-800 mb-2">
              {recipe.recipes__name}
            </h3>
            <p className="text-sm text-gray-600">
              ⏱ {recipe.recipes__total_time}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default RecipeCard;
