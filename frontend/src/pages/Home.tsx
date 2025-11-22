import { Link } from "react-router-dom";
import { Gamepad2, User, Play } from "lucide-react";

export default function Home() {
    const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="text-center max-w-4xl mx-auto mt-16 px-4">

      {/* Animated Hero */}
      <div className="relative p-10 rounded-3xl shadow-xl overflow-hidden">

        {/* Glowing Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-500 to-green-700 blur-3xl opacity-30 animate-pulse"></div>

        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            MiniGames Hub 🎮
          </h1>

          <p className="text-xl opacity-90">
            Fun challenges. Glowing retro vibes. Earn points. Improve skills.
          </p>
        </div>
      </div>

      {/* Animated Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Games Card */}
        <Link
          to="/tasks"
          className="
            group relative p-8 rounded-2xl bg-white border border-green-500 
            shadow-lg hover:shadow-2xl transition-all duration-300
          "
        >
          {/* Glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition bg-green-300 blur-xl rounded-2xl"></div>

          <div className="relative flex flex-col items-center gap-4">
            <Gamepad2
              size={50}
              className="text-green-700 group-hover:scale-110 transition"
            />
            <h2 className="text-2xl font-bold text-green-700">Mini-Games</h2>
            <p className="text-gray-600">
              Play classic challenges, track your progress, earn rewards.
            </p>
          </div>
        </Link>

       <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to MiniGames</h1>

      {/* SHOW PROFILE CARD ONLY IF LOGGED IN */}
      {user && (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border border-green-200">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Your Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      {/* SHOW LOGIN PROMPT IF NOT LOGGED IN */}
        {!user && (
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4 text-lg">Please login to view your profile and track your progress.</p>
            <a
              href="/login"
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  
        {/* Big Start Button */}
        <div className="mt-16">
          <Link
            to="/tasks/1"
            className="
              inline-flex items-center gap-3 px-10 py-5 text-xl 
              bg-green-700 text-white rounded-2xl shadow-xl
              hover:bg-green-600 hover:scale-[1.03] active:scale-95 
              transition-all duration-200
            "
          >
            <Play size={30} />
            Start First Challenge
          </Link>
        </div>
    </div>
  );
}