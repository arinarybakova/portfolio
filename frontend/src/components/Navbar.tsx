import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          MiniGames 🎮
        </Link>

        {/* MENU LINKS */}
        <div className="flex gap-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-green-200 ${
                isActive ? "font-semibold border-b-2 border-white pb-1" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `hover:text-green-200 ${
                isActive ? "font-semibold border-b-2 border-white pb-1" : ""
              }`
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `hover:text-green-200 ${
                isActive ? "font-semibold border-b-2 border-white pb-1" : ""
              }`
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
