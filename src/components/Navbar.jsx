import { TfiHome } from "react-icons/tfi";
import { GoSearch } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { UserStatus } from "./UserStatus";

export function Navbar() {
  const location = useLocation(); // useLocation is used to get the current path.
  //For each Link, we check if location.pathname matches the link’s path.
  // If it matches, we apply text-gray-400 to simulate the "active" style (the same color as hover:text-gray-400).

  return (
    <>
      <header className="w-full fixed bg-[#fcfcfc] border-b border-gray-200 z-50">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between p-5">
          <div className="noto-serif-kr">
            <span className="font-bold">Fork</span>It
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden space-x-5 md:flex">
              <Link
                to="/"
                className={`flex items-center gap-2 ${
                  location.pathname === "/"
                    ? "text-gray-400 hover:text-gray-700"
                    : "text-gray-700 hover:text-gray-400"
                }`}
              >
                <TfiHome className="text-lg" />
                Home
              </Link>
              <Link
                to="/explore"
                className={`flex items-center gap-2 ${
                  location.pathname === "/explore"
                    ? "text-gray-400"
                    : "text-gray-700 hover:text-gray-400"
                }`}
              >
                <GoSearch className="text-lg" />
                Explore
              </Link>
              <Link
                to="/favorites"
                className={`flex items-center gap-2 ${
                  location.pathname === "/favorites"
                    ? "text-gray-400"
                    : "text-gray-700 hover:text-gray-400"
                }`}
              >
                <MdFavoriteBorder className="text-lg" />
                Favorites
              </Link>
            </nav>
            <UserStatus />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
