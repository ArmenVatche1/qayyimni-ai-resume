import { useState } from "react"
import { motion } from "framer-motion"
import API_BASE_URL from "../config"

export default function UploadCard() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)
    if (!file) {
      setError("Please pick a file first.")
      return
    }

    const fd = new FormData()
    fd.append("file", file)
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: "POST",
        body: fd,
      })
      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="upload" className="section">
      <div className="container grid md:grid-cols-2 gap-10 items-start">
        <motion.form
          onSubmit={handleSubmit}
          className="card p-8 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-bold">Upload your resume</h3>
          <p className="text-gray-400">PDF, DOCX, TXT (max ~10MB)</p>
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="block w-full text-gray-700"
          />
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Analyzing…" : "Analyze Resume"}
          </button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </motion.form>

        <motion.div
          className="card p-8 min-h-[220px] space-y-6 overflow-y-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {loading && <p className="text-gray-400">Analyzing your CV…</p>}
          {!loading && !result && <p className="text-gray-400">Your AI feedback will appear here.</p>}

          {result && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-2">Summary</h4>
                <p className="text-gray-300">{result.summary}</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">ATS Score</h4>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div className="bg-brand-yellow h-4 rounded-full" style={{ width: `${result.ats_score || 0}%` }}></div>
                </div>
                <p className="text-sm mt-1">{result.ats_score || 0}%</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-green-400">Strengths</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {result.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-red-400">Gaps</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {result.gaps?.map((g, i) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Suggestions</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {result.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              {result.improved_bullets && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Improved Resume Bullets</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {result.improved_bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}
              {result.keywords && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(result.keywords).map(([k, arr], idx) => (
                      <div key={idx}>
                        <p className="text-sm font-bold">{k}</p>
                        <div className="flex flex-wrap gap-2 mt-1 mb-2">
                          {arr.map((kw, i) => (
                            <span key={i} className="text-xs bg-brand-yellow text-black px-2 py-1 rounded-full">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {result.red_flags && result.red_flags.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-red-400">Red Flags</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {result.red_flags.map((rf, i) => <li key={i}>{rf}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
