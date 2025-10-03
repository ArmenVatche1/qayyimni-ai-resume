import { motion } from "framer-motion"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="relative container flex items-center justify-between py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold text-brand-black"
        >
          <h1 className="text-2xl font-bold text-brand-yellow">قيّمني</h1>
        </motion.div>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8 text-brand-black font-medium">
          {["Features", "How It Works", "Upload", "Testimonials", "FAQ"].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a href={`#${item.toLowerCase().replace(/\s+/g, '')}`} className="hover:text-brand-pink transition">
                {item}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href="#upload"
          className="hidden md:inline-flex btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Now
        </motion.a>
      </nav>
    </header>
  )
}
