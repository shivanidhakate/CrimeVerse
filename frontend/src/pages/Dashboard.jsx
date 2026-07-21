import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { ShieldAlert, User, LogOut, RefreshCw } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  //state
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchReports = async () => {
  const { data, error } = await supabase
    .from("crime_reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  } else {
    setReports(data);
  }

  setLoading(false);
};

useEffect(() => {
  fetchReports();
}, []);


const totalReports = reports.length;

const highSeverity = reports.filter(
  (report) => report.severity === "High"
).length;

const mediumSeverity = reports.filter(
  (report) => report.severity === "Medium"
).length;

const lowSeverity = reports.filter(
  (report) => report.severity === "Low"
).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-cyan-400">
          CrimeVerse 🚔
        </h1>

        <div className="flex gap-3">
  <button
    onClick={fetchReports}
    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition"
  >
    <RefreshCw size={18} />
    Refresh
  </button>

  <button
    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
    onClick={() => navigate("/login")}
  >
    <LogOut size={18} />
    Logout
  </button>
</div>
      </div>

      {/* Welcome */}
      <h2 className="text-3xl font-semibold mb-8">
        Welcome Back 👋
      </h2>
      {/* Statistics */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

  <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
    <h3 className="text-gray-400">Total Reports</h3>
    <p className="text-4xl font-bold text-cyan-400 mt-2">
      {totalReports}
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
    <h3 className="text-gray-400">High Severity</h3>
    <p className="text-4xl font-bold text-red-500 mt-2">
      {highSeverity}
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
    <h3 className="text-gray-400">Medium Severity</h3>
    <p className="text-4xl font-bold text-yellow-400 mt-2">
      {mediumSeverity}
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
    <h3 className="text-gray-400">Low Severity</h3>
    <p className="text-4xl font-bold text-green-400 mt-2">
      {lowSeverity}
    </p>
  </div>

</div>

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
      {/* Recent Crime Reports */}
<div className="mt-10">
  <h2 className="text-3xl font-bold mb-6">
    Recent Crime Reports
  </h2>

  {loading ? (
    <p className="text-gray-400">Loading reports...</p>
  ) : reports.length === 0 ? (
    <p className="text-gray-400">No reports found.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-slate-900 rounded-xl border border-slate-800 p-5"
        >
          <h3 className="text-xl font-bold text-cyan-400">
  {report.title}
</h3>

{report.image_url && (
  <img
    src={report.image_url}
    alt="Crime Evidence"
    className="w-full h-48 object-cover rounded-lg mt-4 mb-4"
  />
)}

<p className="text-gray-300 mt-2">
  {report.description}
</p>

          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Type:</strong> {report.crime_type}</p>
            <p><strong>Location:</strong> {report.location}</p>
            <p>
  <strong>Date:</strong>{" "}
  {new Date(report.crime_date).toLocaleDateString()}
</p>
            <p><strong>Time:</strong> {report.crime_time}</p>
            <p>
  <strong>Severity:</strong>{" "}
  <span
    className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
      report.severity === "High"
        ? "bg-red-600"
        : report.severity === "Medium"
        ? "bg-yellow-500"
        : "bg-green-600"
    }`}
  >
    {report.severity}
  </span>
</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}

export default Dashboard;