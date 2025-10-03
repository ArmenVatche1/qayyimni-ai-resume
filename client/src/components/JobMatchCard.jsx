import { useState } from "react";
import { motion } from "framer-motion";

export default function JobMatchCard() {
  const [file, setFile] = useState(null);
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!file || !job.trim()) {
      setError("Please upload a resume and enter a job description.");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("job", job);

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/jobmatch", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="jobmatch" className="section">
      <div className="container grid md:grid-cols-2 gap-10 items-start">
        {/* Upload Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="card p-8 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-bold">Match Resume to Job</h3>
          <p className="text-gray-400 text-sm">
            Upload your resume and paste a job description
          </p>

          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="block w-full text-gray-200"
          />

          <textarea
            placeholder="Paste job description here..."
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="w-full h-32 p-3 rounded-lg border bg-gray-900 text-gray-200 border-gray-700"
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Analyzing…" : "Analyze Match"}
          </button>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </motion.form>

        {/* Results */}
        <motion.div
          className="card p-8 min-h-[220px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {loading && <p className="text-gray-400">Loading analysis…</p>}
          {!loading && !result && (
            <p className="text-gray-400">Results will appear here.</p>
          )}

          {result && !result.error && (
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Match Score</h4>
              <p className="text-2xl font-bold text-brand-yellow">
                {result.match_score} / 100
              </p>

              <h4 className="text-lg font-semibold">Strengths</h4>
              <ul className="list-disc pl-5 text-gray-300">
                {result.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold">Weaknesses</h4>
              <ul className="list-disc pl-5 text-gray-300">
                {result.weaknesses?.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold">Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {result.missing_keywords?.map((k, i) => (
                  <span
                    key={i}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded-full"
                  >
                    {k}
                  </span>
                ))}
              </div>

              <h4 className="text-lg font-semibold">Suggestions</h4>
              <ul className="list-disc pl-5 text-gray-300">
                {result.suggestions?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {result?.error && (
            <div className="text-red-500">
              Error: {result.error}
              <pre className="text-xs text-gray-400 whitespace-pre-wrap">
                {result.raw_output}
              </pre>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
