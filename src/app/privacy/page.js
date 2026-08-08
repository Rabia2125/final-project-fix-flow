import Link from 'next/link';

export default function PrivacyPage() {
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
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition">
            Login / Register
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white py-16 px-8 border-b border-slate-200 text-center">
        <div className="max-w-3xl mx-auto space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Privacy Policy</h2>
          <p className="text-slate-500 text-sm">Last updated: August 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-8 max-w-4xl mx-auto space-y-8 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm my-12">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">1. Information We Collect</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We collect personal information such as your name, email address, and repair device details when you register an account or submit a repair request on FixFlow.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">2. How We Use Your Information</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Your data is used strictly to process repair tasks, provide AI-powered diagnostics, authenticate your sessions securely via JWT cookies, and connect you with verified local vendors.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">3. Data Security</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We implement robust security measures, including password hashing with bcrypt and secure HTTP-only cookies, to protect your personal information from unauthorized access.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-8 border-t border-slate-800 text-center text-sm">
        <p>© 2026 FixFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}