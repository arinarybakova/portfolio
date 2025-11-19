import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<h1 className="text-2xl">Welcome!</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
