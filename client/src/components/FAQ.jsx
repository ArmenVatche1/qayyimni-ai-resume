import { useState } from "react"

const faqs = [
  { q: "Is my resume data secure?", a: "Yes. Files are processed securely and never stored permanently." },
  { q: "What file types can I upload?", a: "Currently PDF, DOCX, and TXT formats are supported." },
  { q: "Do I need to pay?", a: "You get 1 free critique. For unlimited feedback, subscribe to the Pro plan." },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="section bg-black text-white">
      <div className="container">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white">FAQ</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="card bg-gray-900 border border-gray-700 p-4 cursor-pointer transition hover:border-brand-pink"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{f.q}</h3>
                <span className="text-brand-pink text-xl font-bold">
                  {open === i ? "−" : "+"}
                </span>
              </div>
              {open === i && <p className="mt-2 text-gray-300">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
