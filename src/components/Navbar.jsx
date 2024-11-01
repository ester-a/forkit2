import { TfiHome } from "react-icons/tfi";
import { GoSearch } from "react-icons/go";
import { CiSaveDown2 } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
    const location = useLocation(); // useLocation is used to get the current path.
                                     //For each Link, we check if location.pathname matches the link’s path.
                                    // If it matches, we apply text-gray-400 to simulate the "active" style (the same color as hover:text-gray-400).

  return (
    <>
      <header className="w-full fixed bg-[#fcfcfc] border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between p-5">
          <div className="noto-serif-kr">
            <span className="font-bold">Fork</span>It
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden space-x-5 md:flex">
              <Link
                to="/"
                className={`flex items-center gap-2 ${
                    location.pathname === "/" ? "text-gray-400 hover:text-gray-700" : "text-gray-700 hover:text-gray-400"
                  }`}
              >
                <TfiHome className="text-lg" />
                Home
              </Link>
              <Link
                to="/explore"
                className={`flex items-center gap-2 ${
                    location.pathname === "/explore" ? "text-gray-400" : "text-gray-700 hover:text-gray-400"
                  }`}
              >
                <GoSearch className="text-lg" />
                Explore
              </Link>
              <Link
                to="/saved"
                className={`flex items-center gap-2 ${
                    location.pathname === "/saved" ? "text-gray-400" : "text-gray-700 hover:text-gray-400"
                  }`}
              >
                <CiSaveDown2 className="text-lg" />
                Saved
              </Link>
            </nav>

            <Link to="/login" className="text-gray-700 hover:text-gray-400">
              <CiLogin className="text-lg inline-block mr-1" /> Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-white bg-black rounded hover:bg-gray-300 hover:text-black"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;

