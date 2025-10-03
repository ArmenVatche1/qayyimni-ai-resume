import Header from "./components/Header"
import Hero from "./components/Hero"
import UploadCard from "./components/UploadCard"
import CoverLetterCard from "./components/CoverLetterCard"
import JobMatchCard from "./components/JobMatchCard"
import Testimonials from "./components/Testimonials"
import Features from "./components/Features"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />

        {/* Resume Feedback */}
        <section id="feedback" className="section">
          <div className="container">
            <h2 className="text-4xl font-bold mb-8 text-center">Resume Feedback</h2>
            <UploadCard />
          </div>
        </section>

        {/* Cover Letter Generator */}
        <section id="coverletter" className="section bg-gray-900">
          <div className="container">
            <h2 className="text-4xl font-bold mb-8 text-center">AI Cover Letter Generator</h2>
            <CoverLetterCard />
          </div>
        </section>

        {/* Job Match Analyzer */}
        <section id="jobmatch" className="section">
          <div className="container">
            <h2 className="text-4xl font-bold mb-8 text-center">Resume vs Job Match</h2>
            <JobMatchCard />
          </div>
        </section>

        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

export default App
