import { useState } from "react"
import { motion } from "framer-motion"
import API_BASE_URL from "../config"

export default function CoverLetterCard() {
  const [file, setFile] = useState(null)
  const [job, setJob] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (!file) {
      setError("Please upload your resume first.")
      return
    }
    if (!job.trim()) {
      setError("Please paste a job description.")
      return
    }

    const fd = new FormData()
    fd.append("file", file)
    fd.append("job", job)

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/coverletter`, {
        method: "POST",
        body: fd,
      })
      if (!res.ok) throw new Error("Request failed")
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data.cover_letter)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-10 items-start">
        {/* Upload + Job description form */}
        <motion.form
          onSubmit={handleSubmit}
          className="card p-8 space-y-6 bg-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-bold">Generate a Cover Letter</h3>
          <p className="text-gray-400">Upload your resume and paste a job description</p>

          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="block w-full text-gray-200"
          />

          <textarea
            placeholder="Paste the job description here..."
            value={job}
            onChange={(e) => setJob(e.target.value)}
            rows={6}
            className="w-full rounded-md p-3 text-gray-900"
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </motion.form>

        {/* Output card */}
        <motion.div
          className="card p-8 min-h-[220px] bg-gray-900"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {loading && <p className="text-gray-400">Generating cover letter...</p>}
          {!loading && !result && <p className="text-gray-400">Your cover letter will appear here.</p>}
          {result && (
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-brand-yellow">Generated Cover Letter</h4>
              <p className="whitespace-pre-wrap text-gray-200">{result}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
