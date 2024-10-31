import { TfiHome } from "react-icons/tfi";
import { GoSearch } from "react-icons/go";
import { CiSaveDown2 } from "react-icons/ci";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-[#fcfcfc] border-t border-gray-200 p-2 md:hidden flex justify-around">
        <Link to="/" className="flex flex-col items-center text-gray-700 hover:text-gray-400">
            <TfiHome className="text-lg" />
            <span className="text-sm">Home</span>
        </Link>
        <Link to="/explore" className="flex flex-col items-center text-gray-700 hover:text-gray-400">
            <GoSearch className="text-lg" />
          <span className="text-sm">Explore</span>
        </Link>
        <Link to="/saved" className="flex flex-col items-center text-gray-700 hover:text-gray-400">
            <CiSaveDown2 className="text-lg" />
            <span className="text-sm">Saved</span>
        </Link>
      </div>
    </>
  );
}
export default Footer;
