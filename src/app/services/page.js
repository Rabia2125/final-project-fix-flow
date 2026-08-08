import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <h1 className="text-xl font-extrabold text-slate-900">Fix<span className="text-blue-600">Flow</span></h1>
        <div className="flex gap-6 items-center text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/services" className="text-blue-600 font-semibold">Services</Link>
          <Link href="/how-it-works" className="hover:text-blue-600 transition">How It Works</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition">
            Login / Register
          </Link>
        </div>
      </nav>

      {/* Header Section */}
      <section className="bg-white py-20 px-8 border-b border-slate-200 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-blue-200">
            Our Expertise
          </span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Professional Repair Services & Solutions
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            From mobile screens to complex home appliances and electronics, get fast, reliable, and AI-diagnosed repair services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-4xl">📱</div>
            <h3 className="text-xl font-bold text-slate-900">Mobile Repair</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Expert diagnosis and swift repairs for all major smartphone brands. Screen replacements, battery swaps, charging port fixes, and software troubleshooting.
            </p>
            <div className="pt-2">
              <Link href="/login" className="text-blue-600 font-bold text-sm hover:underline">Book Mobile Repair →</Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-4xl">💻</div>
            <h3 className="text-xl font-bold text-slate-900">Laptop Repair</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Comprehensive laptop maintenance including hardware upgrades, keyboard replacements, screen fixes, motherboard servicing, and OS installations.
            </p>
            <div className="pt-2">
              <Link href="/login" className="text-blue-600 font-bold text-sm hover:underline">Book Laptop Repair →</Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-4xl">⚡</div>
            <h3 className="text-xl font-bold text-slate-900">Appliance Repair</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Professional troubleshooting and repair services for essential home appliances. Certified technicians ensure quick turnaround times.
            </p>
            <div className="pt-2">
              <Link href="/login" className="text-blue-600 font-bold text-sm hover:underline">Book Appliance Repair →</Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-4xl">🔌</div>
            <h3 className="text-xl font-bold text-slate-900">Electronics Repair</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Specialized care for custom gadgets, smart devices, and general consumer electronics backed by real-time tracking and verified vendor quotes.
            </p>
            <div className="pt-2">
              <Link href="/login" className="text-blue-600 font-bold text-sm hover:underline">Book Electronics Repair →</Link>
            </div>
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