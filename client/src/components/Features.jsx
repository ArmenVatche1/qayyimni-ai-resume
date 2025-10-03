import { motion } from "framer-motion"
import { Sparkles, FileText, ThumbsUp, Clock } from "lucide-react"

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-brand-pink" />,
    title: "AI-Powered Insights",
    desc: "Get instant recommendations backed by advanced language models."
  },
  {
    icon: <FileText className="w-8 h-8 text-brand-yellow" />,
    title: "ATS Optimization",
    desc: "Ensure your resume passes automated screening systems."
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-brand-pink" />,
    title: "Recruiter-Friendly",
    desc: "Improve clarity, structure, and wording for maximum impact."
  },
  {
    icon: <Clock className="w-8 h-8 text-brand-yellow" />,
    title: "Fast Feedback",
    desc: "Upload your resume and get tailored feedback in under a minute."
  }
]

export default function Features() {
  return (
    <section id="features" className="section bg-gray-50">
      <div className="container text-center">
        <h2 className="text-3xl font-extrabold mb-12 text-brand-black">
          Why Choose Resume<span className="text-brand-pink">AI</span>?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="card p-6 hover:-translate-y-2 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
