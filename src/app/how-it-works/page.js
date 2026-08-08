import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <h1 className="text-xl font-extrabold text-slate-900">Fix<span className="text-blue-600">Flow</span></h1>
        <div className="flex gap-6 items-center text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/services" className="hover:text-blue-600 transition">Services</Link>
          <Link href="/how-it-works" className="text-blue-600 font-semibold">How It Works</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition">
            Login / Register
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white py-20 px-8 border-b border-slate-200 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-blue-200">
            Simple & Transparent Process
          </span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            How FixFlow Works
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Get your devices repaired in 4 easy steps from submission to final delivery.
          </p>
        </div>
      </section>

      {/* Steps Grid */}
      <section className="py-20 px-8 max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-blue-600 font-black text-2xl">01</span>
            <h3 className="text-xl font-bold text-slate-900">Submit Repair Request</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Create an account or login, then submit your device details along with a description of the problem you are facing.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-blue-600 font-black text-2xl">02</span>
            <h3 className="text-xl font-bold text-slate-900">Instant AI Diagnosis</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our integrated AI Assistant analyzes your description instantly and provides automated troubleshooting and diagnosis recommendations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-blue-600 font-black text-2xl">03</span>
            <h3 className="text-xl font-bold text-slate-900">Connect With Vendors</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Verified local repair vendors review your request and provide transparent pricing quotes so you can choose the best option.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-blue-600 font-black text-2xl">04</span>
            <h3 className="text-xl font-bold text-slate-900">Real-Time Tracking & Fix</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Track the repair status live on your dashboard from pending to completion and get your device fixed securely.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-8 border-t border-slate-800 text-center text-sm">
        <p>© 2026 FixFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}