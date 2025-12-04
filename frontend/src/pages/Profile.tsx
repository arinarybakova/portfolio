import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Gamepad2, Star, Lock, Image, User, X } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./Profile.css";

interface UserType {
  name: string;
  email: string;
  avatar: string;
}

interface GameStat {
  date: string;
  game: string;
  score: number;
}

interface Achievement {
  name: string;
  description: string;
}

const [changePasswordOpen, setChangePasswordOpen] = useState(false);

/* ========================
    PROFILE PICTURE MODAL
======================== */
function ProfilePictureModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  const [generatedUrl, setGeneratedUrl] = useState("");

  const generateRandomAvatar = () => {
    const random = Math.floor(Math.random() * 70) + 1;
    setGeneratedUrl(`https://i.pravatar.cc/300?img=${random}`);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setGeneratedUrl(url);
    }
  };

  const handleSave = () => {
    if (generatedUrl) onSelect(generatedUrl);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-bg">
      <div className="modal-box space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Image className="w-5" /> Change Profile Picture
        </h2>

        <div className="flex flex-col items-center gap-4">
          {generatedUrl && (
            <img
              src={generatedUrl}
              className="w-32 h-32 rounded-full border-4 border-purple-600"
            />
          )}

          <button
            className="profile-btn bg-[#6d28d9] text-white hover:bg-[#5b21b6]"
            onClick={generateRandomAvatar}
          >
            Generate Random Avatar
          </button>

          <label className="profile-btn cursor-pointer bg-[#6d28d9] text-white hover:bg-[#5b21b6]">
            Upload Image
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#6d28d9] text-white rounded-lg hover:bg-[#5b21b6]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================
    ACHIEVEMENT MODAL
======================== */
function AchievementModal({
  open,
  onClose,
  achievement,
}: {
  open: boolean;
  onClose: () => void;
  achievement: Achievement | null;
}) {
  if (!open || !achievement) return null;

  return (
    <div className="modal-bg">
      <div className="modal-box relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold">{achievement.name}</h2>
        <p className="text-gray-300">{achievement.description}</p>
      </div>
    </div>
  );
}

/* ========================
        MAIN PROFILE
======================== */
export default function Profile() {
  const [user, setUser] = useState<UserType>({
    name: "ShadowReaperX",
    email: "shadow@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [achievementModal, setAchievementModal] = useState<Achievement | null>(null);

  const saveProfile = () => {
    if (!newName.trim() || !newEmail.trim()) {
      setAlert({ type: "error", message: "All fields are required" });
      return;
    }

    setUser({ ...user, name: newName, email: newEmail });
    setAlert({ type: "success", message: "Profile updated!" });
    setEditOpen(false);

    setTimeout(() => setAlert(null), 2000);
  };

  /* ========================
        HISTORICAL DATA
  ======================== */
  const games = ["Apex Legends", "Elden Ring", "Cyberpunk 2077"];
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedGame, setSelectedGame] = useState(games[0]);

  const gameStats: GameStat[] = useMemo(() => {
    return [
      { date: selectedDate, game: selectedGame, score: Math.floor(Math.random() * 200) },
      { date: selectedDate, game: selectedGame, score: Math.floor(Math.random() * 200) },
      { date: selectedDate, game: selectedGame, score: Math.floor(Math.random() * 200) },
    ];
  }, [selectedDate, selectedGame]);

  const achievements: Achievement[] = [
    { name: "Sharpshooter", description: "Hit 100 headshots in the game." },
    { name: "Speedrunner", description: "Complete a level under 10 minutes." },
    { name: "Collector", description: "Collect all hidden items." },
  ];

  return (
    <div className="profile-page">
      <div className="pt-24" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="profile-card"
      >
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            className="profile-avatar"
            onClick={() => setAvatarOpen(true)}
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>

            {/* Buttons in one line */}
            <div className="flex gap-2 mt-2 flex-wrap">
              <button
                onClick={() => setEditOpen(true)}
                className="bg-[#6d28d9] text-white hover:bg-[#5b21b6] px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <User size={16} /> Edit Profile
              </button>

              <button
              onClick={() => setChangePasswordOpen(true)}
              className="bg-[#6d28d9] text-white hover:bg-[#5b21b6] px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Lock size={16} /> Change Password
            </button>
            </div>
          </div>
        </div>

        {/* XP BAR */}
        <div className="mt-5">
          <div className="flex justify-between text-sm">
            <span>XP Progress</span>
            <span>78%</span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full mt-1 overflow-hidden">
            <div className="h-3 bg-[#6d28d9]" style={{ width: "78%" }}></div>
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="w-5 text-yellow-500" /> Achievements
          </h2>

          <div className="grid grid-cols-3 gap-3 mt-3">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className="achievement-box cursor-pointer"
                onClick={() => setAchievementModal(ach)}
              >
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                <p className="text-xs">{ach.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAVORITE GAMES */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Gamepad2 className="w-5 text-purple-400" /> Favorite Games
          </h2>
          <ul className="text-gray-300 mt-2 space-y-2">
            {games.map((g) => (
              <li key={g}>• {g}</li>
            ))}
          </ul>
        </div>

        {/* HISTORICAL DATA */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Gamepad2 className="w-5 text-purple-400" /> Historical Stats
          </h2>

          <div className="flex gap-3 mt-3 flex-wrap">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-gray-800 text-white px-3 py-2 rounded-lg"
            />
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="bg-gray-800 text-white px-3 py-2 rounded-lg"
            >
              {games.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="mt-3" style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gameStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#6d28d9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* EDIT PROFILE MODAL */}
      {editOpen && (
        <div className="modal-bg">
          <div className="modal-box space-y-4">
            <h2 className="text-xl font-semibold">Edit Profile</h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm">Name</label>
                <input
                  className="w-full mt-1 bg-gray-800 text-white rounded-lg px-3 py-2"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm">Email</label>
                <input
                  className="w-full mt-1 bg-gray-800 text-white rounded-lg px-3 py-2"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-[#6d28d9] text-white hover:bg-[#5b21b6] rounded-lg"
                onClick={saveProfile}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE PIC MODAL */}
      <ProfilePictureModal
        open={avatarOpen}
        onClose={() => setAvatarOpen(false)}
        onSelect={(url) => setUser({ ...user, avatar: url })}
      />

      {/* ACHIEVEMENT MODAL */}
      <AchievementModal
        open={achievementModal !== null}
        achievement={achievementModal}
        onClose={() => setAchievementModal(null)}
      />

      {/* ALERT POPUP */}
      {alert && (
        <div
          className={`alert-popup ${alert?.type === "success" ? "alert-success" : "alert-error"}`}
        >
          {alert?.message}
        </div>
      )}
    </div>
  );
  function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  if (!open) return null;

  return (
    <div className="modal-bg">
      <div className="modal-box space-y-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold">Change Password</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm">New Password</label>
            <input
              type="password"
              className="w-full mt-1 bg-gray-800 text-white rounded-lg px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 bg-gray-800 text-white rounded-lg px-3 py-2"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-[#6d28d9] text-white hover:bg-[#5b21b6] rounded-lg"
            onClick={() => {
              if (password !== confirm) {
                //alert("Passwords do not match");
                return;
              }
              //alert("Password changed successfully!");
              onClose();
            }}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
}
