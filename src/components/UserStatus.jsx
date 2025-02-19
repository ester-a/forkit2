import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function UserStatus() {
  const { user, isAuth, logout } = useAuth();
  return (
    <div>
      {isAuth ? (
        <>
          {/* zde by bylo lepsi pouzit useNavigation */}
          <p className="text-gray-700 inline-block mr-1">
            {user.user_metadata.firstName}
          </p>
          <Link
            onClick={logout}
            to="/"
            className="text-gray-700 hover:text-gray-400"
          >
            <CiLogout className="text-lg inline-block mr-1" /> Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="text-gray-700 hover:text-gray-400">
            <CiLogin className="text-lg inline-block mr-1" /> Log in
          </Link>
          <Link
            to="/signup"
            className="ml-5 px-4 py-2 text-white bg-black rounded hover:bg-gray-300 hover:text-black"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}

export default UserStatus;
