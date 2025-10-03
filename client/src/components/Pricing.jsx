import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function Pricing() {
  return (
    <section id="pricing" className="section bg-black text-white">
      <div className="container text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-white">Simple Pricing</h2>
        <p className="text-gray-400 mb-12">
          Start with a free trial. Upgrade anytime for unlimited AI-powered feedback.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Free Trial */}
          <motion.div
            className="card p-8 border border-gray-700 hover:-translate-y-2 transition-transform bg-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Free Trial</h3>
            <p className="text-4xl font-extrabold text-brand-pink mb-4">$0</p>
            <p className="mb-6 text-gray-400">One free CV critique to get started.</p>
            <ul className="space-y-2 text-left mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-brand-pink" /> 1 AI critique
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-brand-pink" /> Secure file upload
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-brand-pink" /> Instant feedback
              </li>
            </ul>
            <a href="#upload" className="btn btn-secondary w-full">Start Free Trial</a>
          </motion.div>

          {/* Paid Plan */}
          <motion.div
            className="card p-8 border border-gray-700 hover:-translate-y-2 transition-transform bg-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Pro Plan</h3>
            <p className="text-4xl font-extrabold text-brand-yellow mb-4">
              $20<span className="text-lg font-normal">/mo</span>
            </p>
            <p className="mb-6 text-gray-400">Unlimited critiques and premium support.</p>
            <ul className="space-y-2 text-left mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-brand-yellow" /> Unlimited AI critiques
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-brand-yellow" /> Advanced keyword analysis
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="text-brand-yellow" /> Priority support
              </li>
            </ul>
            <a href="#upload" className="btn btn-primary w-full">Subscribe Now</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
