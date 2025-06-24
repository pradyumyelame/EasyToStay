import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { MapPinHouse } from "lucide-react";

const Header = () => {
  const { user, ready } = useContext(UserContext);

  if (!ready) return <div className="text-center py-4">Loading...</div>;

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-[#f5385D] hover:text-[#d72f4a] transition-colors">
        <MapPinHouse className="w-7 h-7" />
        <span className="font-bold text-xl text-gray-800">EasyStay</span>
      </Link>

      {/* Profile / Menu */}
      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2 hover:shadow-md transition-shadow"
      >
        {/* Menu Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        {/* Profile Avatar or Default Icon */}
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
          {user?.profilePic ? (
            <img
              src={`https://easytostay-backend.onrender.com${user.profilePic}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* User Name */}
        {!!user && (
          <span className="text-gray-700 font-medium hidden sm:inline">
            {user.name}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Header;
