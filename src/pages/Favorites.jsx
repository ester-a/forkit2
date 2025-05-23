import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Recipes } from "../components/Recipes";

export function Favorites() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Favorite Recipes
            </h2>

            <div className="mt-5">
              <p className="lg:text-lg font-medium text-gray-900 pb-5">
                Save your favorite recipes.
              </p>
            </div>

            <Link to="/login">
              <button className="flex justify-center w-full rounded-md bg-gray-500 px-3 py-2 font-semibold text-black shadow-sm hover:bg-gray-800 hover:text-gray-300">
                Sign in
              </button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="mt-3 w-full bg-white text-gray-500 hover:text-gray-700 px-4 py-2 font-medium"
            >
              Back to Content
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="pt-24 px-5">
          <Recipes showFavorites={true} />
        </div>
      </>
    );
  }
}

export default Favorites;
