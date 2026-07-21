import { useState } from "react";
import { supabase } from "../services/supabase";
import {
  ShieldAlert,
  MapPin,
  Calendar,
  Clock,
  Upload,
} from "lucide-react";

function ReportCrime() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [severity, setSeverity] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !title ||
    !description ||
    !crimeType ||
    !location ||
    !date ||
    !severity
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    setLoading(true);
    setSuccess("");

    let imageUrl = "";

    // Upload image if selected
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("crime-images")
        .upload(fileName, file);

      if (uploadError) {
  console.log("UPLOAD ERROR:", uploadError);
  alert("UPLOAD ERROR: " + uploadError.message);
  return;
}

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("crime-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    // Save report to database
    const { error } = await supabase.from("crime_reports").insert([
      {
        title,
        description,
        crime_type: crimeType,
        location,
        crime_date: date,
        crime_time: time,
        severity,
        image_url: imageUrl,
      },
    ]);

    if (error) {
  console.log("DATABASE ERROR:", error);
  alert("DATABASE ERROR: " + error.message);
  return;
}

    setSuccess("✅ Crime report submitted successfully!");

    // Clear form
    setTitle("");
    setDescription("");
    setCrimeType("");
    setLocation("");
    setDate("");
    setTime("");
    setSeverity("");
    setFile(null);
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-8">
          <ShieldAlert size={36} className="text-cyan-400" />
          <h1 className="text-4xl font-bold">Report Crime</h1>
        </div>

        {success && (
          <div className="mb-6 rounded-lg bg-green-600 p-4 text-white font-semibold">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Crime Title</label>
            <input
              type="text"
              placeholder="Enter crime title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <textarea
              rows="4"
              placeholder="Describe what happened..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block mb-2">Crime Type</label>
            <select
              value={crimeType}
              onChange={(e) => setCrimeType(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <option value="">Select</option>
              <option value="Theft">Theft</option>
              <option value="Robbery">Robbery</option>
              <option value="Cyber Crime">Cyber Crime</option>
              <option value="Assault">Assault</option>
              <option value="Fraud">Fraud</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Location</label>
            <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 px-3">
              <MapPin className="text-cyan-400" size={20} />
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Date</label>
              <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 px-3">
                <Calendar className="text-cyan-400" size={20} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Time</label>
              <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 px-3">
                <Clock className="text-cyan-400" size={20} />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Upload Evidence</label>
            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg p-3">
              <Upload className="text-cyan-400" />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {file && (
              <p className="text-green-400 mt-2">
                Selected: {file.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600"
            }`}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportCrime;