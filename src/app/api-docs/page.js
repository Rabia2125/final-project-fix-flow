'use client';

import { useRouter } from 'next/navigation';

export default function ApiDocsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <div className="max-w-4xl w-full mx-auto p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">📚 Swagger API Documentation</h1>
            <p className="text-sm text-slate-500 mt-1">Explore all backend REST endpoints available in FixFlow.</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
          >
            ← Back to Home
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
          <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-2">🔐 Authentication APIs</h3>
          <ul className="text-xs space-y-2 text-slate-600 font-mono">
            <li className="p-2 bg-slate-50 rounded-xl"><span className="font-bold text-emerald-600">POST</span> /api/auth/register - Register new user</li>
            <li className="p-2 bg-slate-50 rounded-xl"><span className="font-bold text-emerald-600">POST</span> /api/auth/login - User login session</li>
          </ul>

          <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-2 pt-4">🛠 Repair & Task APIs</h3>
          <ul className="text-xs space-y-2 text-slate-600 font-mono">
            <li className="p-2 bg-slate-50 rounded-xl"><span className="font-bold text-blue-600">GET / POST</span> /api/tasks - Create or retrieve tasks</li>
            <li className="p-2 bg-slate-50 rounded-xl"><span className="font-bold text-blue-600">GET</span> /api/tasks/track?repairId=ID - Track repair by ID</li>
            <li className="p-2 bg-slate-50 rounded-xl"><span className="font-bold text-amber-600">POST</span> /api/tasks/repair-update - Update lifecycle / cost</li>
          </ul>

          <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-2 pt-4">💰 Bidding APIs</h3>
          <ul className="text-xs space-y-2 text-slate-600 font-mono">
            <li className="p-2 bg-slate-50 rounded-xl"><span className="font-bold text-blue-600">POST</span> /api/tasks/bid - Submit vendor bid</li>
            <li className="p-2 bg-slate-50 rounded-xl"><span className="font-bold text-blue-600">POST</span> /api/tasks/accept-bid - Customer accepts vendor bid</li>
          </ul>

          <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-2 pt-4">⭐ Reviews & Contact APIs</h3>
          <ul className="text-xs space-y-2 text-slate-600 font-mono">
            <li className="p-2 bg-slate-50 rounded-xl"><span className="font-bold text-blue-600">POST</span> /api/tasks/review - Submit rating & review</li>
            <li className="p-2 bg-slate-50 rounded-xl"><span className="font-bold text-blue-600">POST</span> /api/contact - Send inquiry via Resend email</li>
          </ul>
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-100">
        FixFlow &copy; 2026 - Swagger UI Active
      </footer>
    </div>
  );
}