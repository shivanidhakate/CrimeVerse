import { useNavigate } from "react-router-dom";
import { ShieldAlert, User, LogOut } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-cyan-400">
          CrimeVerse 🚔
        </h1>

        <button
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          onClick={() => navigate("/login")}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Welcome */}
      <h2 className="text-3xl font-semibold mb-8">
        Welcome Back 👋
      </h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Report Crime */}
        <div
          onClick={() => navigate("/report")}
          className="cursor-pointer bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-cyan-400 hover:scale-105 transition"
        >
          <ShieldAlert className="text-cyan-400 mb-4" size={40} />
          <h3 className="text-2xl font-bold">Report Crime</h3>
          <p className="text-gray-400 mt-2">
            Report a new crime incident with evidence.
          </p>
        </div>

        {/* Profile */}
        <div
          className="cursor-pointer bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-cyan-400 hover:scale-105 transition"
        >
          <User className="text-cyan-400 mb-4" size={40} />
          <h3 className="text-2xl font-bold">Profile</h3>
          <p className="text-gray-400 mt-2">
            View and manage your profile.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;