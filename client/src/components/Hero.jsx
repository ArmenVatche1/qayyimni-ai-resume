import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-pink-light via-brand-yellow-light to-white">
      {/* Flowing blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-pink opacity-30 blur-3xl"
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-brand-yellow opacity-20 blur-3xl"
        animate={{ x: [0, -80, 80, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-brand-black">
            Let AI polish your resume, instantly.
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Upload your CV and get recruiter-friendly feedback in seconds.
          </p>
          <div className="flex gap-4">
            <a href="#upload" className="btn btn-primary">Upload Now</a>
            <a href="#features" className="btn btn-secondary">How it works</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card overflow-hidden shadow-xl">
            <img
              src="https://source.unsplash.com/600x400/?resume,career"
              alt="Resume review illustration"
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Wavy divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[120px] text-brand-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,128L80,144C160,160,320,192,480,213.3C640,235,800,245,960,224C1120,203,1280,149,1360,122.7L1440,96V320H0Z"></path>
        </svg>
      </div>
    </section>
  )
}
