import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <h1 className="text-xl font-extrabold text-slate-900">Fix<span className="text-blue-600">Flow</span></h1>
        <div className="flex gap-6 items-center text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/services" className="hover:text-blue-600 transition">Services</Link>
          <Link href="/how-it-works" className="hover:text-blue-600 transition">How It Works</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          <Link href="/api-docs" className="hover:text-blue-600 transition">API Docs</Link>
          <Link href="/admin/dashboard" className="hover:text-blue-600 transition font-bold text-slate-800">Admin</Link>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition">
            Login / Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-4 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-blue-200/60">
            🚀 AI-Powered Vendor & Repair Platform
          </span>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Smart Device Repair & Vendor Management Platform
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Submit your repair requests, get AI-powered diagnostics instantly, and connect with verified local repair vendors seamlessly.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/dashboard" className="bg-blue-600 text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition">
              Create Repair Request
            </Link>
            <Link href="/track" className="bg-slate-100 text-slate-700 px-7 py-3.5 rounded-2xl font-bold hover:bg-slate-200 transition border border-slate-200">
              Track Repair ID
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-slate-900">Our Repair Services</h3>
          <p className="text-slate-500 mt-2">Professional diagnosis and fast repair solutions for all your devices.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">📱</div>
            <h4 className="font-bold text-lg text-slate-900 mb-1">Mobile Repair</h4>
            <p className="text-sm text-slate-500">Screen replacements, battery fixes, and hardware diagnosis.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">💻</div>
            <h4 className="font-bold text-lg text-slate-900 mb-1">Laptop Repair</h4>
            <p className="text-sm text-slate-500">Keyboard issues, OS formatting, and motherboard servicing.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-lg text-slate-900 mb-1">Appliance Repair</h4>
            <p className="text-sm text-slate-500">Home appliances expert troubleshooting and maintenance.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">🔌</div>
            <h4 className="font-bold text-lg text-slate-900 mb-1">Electronics Repair</h4>
            <p className="text-sm text-slate-500">Gadgets, smart devices, and custom electronic fixes.</p>
          </div>
        </div>
      </section>

      {/* Why FixFlow? Section */}
      <section className="py-20 bg-white border-t border-slate-200 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-slate-900">Why Choose FixFlow?</h3>
            <p className="text-slate-500 mt-2">Built to provide transparency, speed, and reliability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <span className="text-2xl">🤖</span>
              <h4 className="font-bold text-lg text-slate-900 mt-3 mb-1">AI Repair Assistant</h4>
              <p className="text-sm text-slate-600">Get instant automated insights and troubleshooting steps before assigning a vendor.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <span className="text-2xl">🛡️</span>
              <h4 className="font-bold text-lg text-slate-900 mt-3 mb-1">Verified Vendors</h4>
              <p className="text-sm text-slate-600">Connect safely with certified and background-checked local repair professionals.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <span className="text-2xl">📊</span>
              <h4 className="font-bold text-lg text-slate-900 mt-3 mb-1">Real-Time Tracking</h4>
              <p className="text-sm text-slate-600">Track your repair status live from submission to completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-extrabold text-white">Fix<span className="text-blue-500">Flow</span></h2>
            <p className="text-xs text-slate-500 mt-1">Smart Device Repair & Vendor Management Platform.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/api-docs" className="hover:text-white transition">API Docs</Link>
            <Link href="/admin/dashboard" className="hover:text-white transition">Admin Portal</Link>
            <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
          </div>
          <p className="text-xs text-slate-600">© 2026 FixFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}