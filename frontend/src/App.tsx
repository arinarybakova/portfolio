import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import SnakeGame from './pages/SnakeGame';
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full bg-black text-white">

        {/* Navbar */}
        <Navbar />

        {/* Main content - full screen flex to center */}
        <main className="flex flex-1 items-center justify-center w-full">
          {/* Inner wrapper can have max-width for cards/content */}
          <div className="w-full max-w-4xl px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:taskId" element={<TaskDetails />} />
              <Route path="/tasks/:taskId/snake" element={<SnakeGame />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
