export default function Footer() {
    return (
      <footer className="bg-brand-black text-gray-300 py-10">
        <div className="container grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white">Resume<span className="text-brand-pink">AI</span></h3>
            <p className="mt-2 text-sm">AI-powered resume reviews to help you land more interviews.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-brand-pink">Features</a></li>
              <li><a href="#howitworks" className="hover:text-brand-pink">How It Works</a></li>
              <li><a href="#upload" className="hover:text-brand-pink">Upload</a></li>
              <li><a href="#faq" className="hover:text-brand-pink">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-pink">Twitter</a></li>
              <li><a href="#" className="hover:text-brand-pink">LinkedIn</a></li>
              <li><a href="#" className="hover:text-brand-pink">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-10">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </div>
      </footer>
    )
  }
  