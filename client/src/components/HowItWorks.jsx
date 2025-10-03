import { motion } from "framer-motion"
import { Upload, Search, CheckCircle2 } from "lucide-react"

const steps = [
  { icon: <Upload className="w-10 h-10 text-brand-pink" />, title: "1. Upload Resume", desc: "Upload PDF, DOCX, or TXT securely." },
  { icon: <Search className="w-10 h-10 text-brand-yellow" />, title: "2. AI Analysis", desc: "AI scans for structure, keywords, and clarity." },
  { icon: <CheckCircle2 className="w-10 h-10 text-brand-pink" />, title: "3. Instant Feedback", desc: "Get actionable suggestions instantly." }
]

export default function HowItWorks() {
  return (
    <section id="howitworks" className="section bg-brand-black text-gray-200">
      <div className="container text-center">
        <h2 className="text-3xl font-extrabold mb-12 text-brand-black">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="card p-6 hover:-translate-y-2 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
            >
              <div className="mb-4 flex justify-center">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
