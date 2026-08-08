 import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <h1 className="text-xl font-extrabold text-slate-900">Fix<span className="text-blue-600">Flow</span></h1>
        <div className="flex gap-6 items-center text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/services" className="hover:text-blue-600 transition">Services</Link>
          <Link href="/how-it-works" className="hover:text-blue-600 transition">How It Works</Link>
          <Link href="/about" className="text-blue-600 font-semibold">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition">
            Login / Register
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="bg-white py-20 px-8 border-b border-slate-200 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-blue-200">
            About FixFlow
          </span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Revolutionizing Device Repair & Vendor Management
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            FixFlow bridges the gap between everyday device owners and certified local repair professionals, powered by cutting-edge AI diagnostics.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-8 max-w-5xl mx-auto space-y-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
          <p className="text-slate-600 leading-relaxed">
            We aim to bring transparency, speed, and trust to the repair industry. No more guessing repair costs or struggling to find reliable technicians. With FixFlow, you get instant automated diagnosis and transparent quotes from verified local vendors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-lg text-slate-900 mb-1">Fast & Reliable</h4>
            <p className="text-sm text-slate-500">Streamlined booking and live tracking for all your device issues.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-3">🤖</div>
            <h4 className="font-bold text-lg text-slate-900 mb-1">AI Diagnostics</h4>
            <p className="text-sm text-slate-500">Instant AI-powered insights to help you understand device problems immediately.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-3">🛡️</div>
            <h4 className="font-bold text-lg text-slate-900 mb-1">Verified Experts</h4>
            <p className="text-sm text-slate-500">Trusted network of professional vendors dedicated to quality service.</p>
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