import { motion } from "framer-motion"

const stats = [
  { number: "12,000+", label: "Resumes Reviewed" },
  { number: "95%", label: "User Satisfaction" },
  { number: "3x", label: "More Interviews" },
  { number: "60s", label: "Average Feedback Time" },
]

export default function Stats() {
  return (
    <section className="section bg-brand-black text-white">
      <div className="container grid md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="text-4xl font-extrabold text-brand-yellow">{s.number}</h3>
            <p className="text-gray-300 mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
