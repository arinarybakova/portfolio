import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Gamepad2, Star, Lock, Image } from "lucide-react";

function ProfilePictureModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (url: string) => void }) {
  const [generatedUrl, setGeneratedUrl] = useState("");

  // Simulate AI image generation
  const generateRandomAvatar = () => {
    const random = Math.floor(Math.random() * 1000);
    const url = `https://i.pravatar.cc/150?img=${random}`;
    setGeneratedUrl(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Image className="w-5 h-5" /> Change Profile Picture
        </h2>

        <div className="flex flex-col items-center gap-4">
          {generatedUrl && <img src={generatedUrl} alt="preview" className="w-32 h-32 rounded-full border-4 border-purple-600" />}
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold py-2"
            onClick={generateRandomAvatar}
          >
            Generate Random AI Avatar
          </button>
          <label className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-xl py-2 text-center cursor-pointer">
            Upload Your Image
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GamerProfile() {
  const [user, setUser] = useState({ name: "", email: "", avatar: "https://i.pravatar.cc/150?img=12" });
  const [openPassword, setOpenPassword] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [existingPassword, setExistingPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    // Simulated backend fetch
    const fetchUser = async () => {
      const data = await Promise.resolve({ name: "ShadowReaperX", email: "shadow@example.com", avatar: "https://i.pravatar.cc/150?img=12" });
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        {/* Profile Card */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full border-4 border-purple-600 cursor-pointer"
              onClick={() => setOpenAvatar(true)}
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>XP Progress</span>
              <span>78%</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-3 bg-purple-600" style={{ width: "78%" }}></div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" /> Achievements
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {["Sharpshooter", "Speedrunner", "Collector"].map((ach, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-gray-800 p-3 rounded-xl flex flex-col items-center text-center">
                  <Star className="w-6 h-6 text-yellow-400 mb-1" />
                  <span className="text-xs">{ach}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Favorite Games */}
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-purple-400" /> Favorite Games
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Apex Legends</li>
              <li>• Elden Ring</li>
              <li>• Cyberpunk 2077</li>
            </ul>
          </div>

          {/* Change Password Button */}
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold py-2 mt-2 flex items-center justify-center gap-2"
            onClick={() => setOpenPassword(true)}
          >
            <Lock className="w-4 h-4" /> Change Password
          </button>
        </div>
      </motion.div>

      {/* Change Password Modal */}
      {openPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Change Password</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-300">Existing Password</label>
                <input
                  type="password"
                  value={existingPassword}
                  onChange={(e) => setExistingPassword(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Repeat New Password</label>
                <input
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600" onClick={() => setOpenPassword(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Picture Modal */}
      <ProfilePictureModal
        open={openAvatar}
        onClose={() => setOpenAvatar(false)}
        onSelect={(url) => setUser((prev) => ({ ...prev, avatar: url }))}
      />
    </div>
  );
}
