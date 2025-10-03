import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Alex P.",
    role: "Data Analyst",
    quote: "Got feedback in under a minute. Landed interviews the same week!",
  },
  {
    name: "Sara Q.",
    role: "Frontend Developer",
    quote: "The rewrite suggestions made my CV much more concise and impactful.",
  },
  {
    name: "Michael R.",
    role: "Product Manager",
    quote: "Keyword insights helped me tailor my resume to job descriptions.",
  },
  {
    name: "Emily T.",
    role: "UX Designer",
    quote: "Loved the design suggestions — my CV looks modern and professional now.",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section bg-gray-50">
      <div className="container text-center">
        <h2 className="text-3xl font-extrabold mb-12 text-brand-black">
          What People Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="card p-6 hover:-translate-y-2 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-700 mb-4 italic">“{t.quote}”</p>
              <div className="text-sm font-semibold text-brand-pink">
                {t.name}
              </div>
              <div className="text-xs text-gray-500">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
