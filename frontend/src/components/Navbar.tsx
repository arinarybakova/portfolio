import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/register">Register</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
