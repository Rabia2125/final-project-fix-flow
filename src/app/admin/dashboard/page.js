'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    customers: 0,
    vendors: 0,
    activeRepairs: 0,
    completedRepairs: 0,
    pendingRequests: 0,
    totalRevenue: 0,
  });
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const contentType = res.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format');
        }

        const data = await res.json();
        
        if (res.ok && data.success) {
          setAuthorized(true);
          setStats(data.stats);
          setRepairs(data.repairs);
        } else {
          router.push('/');
        }
      } catch (err) {
        console.error('Auth verification failed:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, [router]);

  if (!authorized && loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <p className="text-slate-600 font-medium">Verifying admin access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 hidden md:flex flex-col justify-between shadow-xl">
        <div>
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-extrabold text-white tracking-wide">Fix<span className="text-blue-500">Flow</span></h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Admin Panel</p>
          </div>
          <nav className="p-4 space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center gap-3 bg-blue-600 text-white shadow-md">
              <span>📊</span> Dashboard Overview
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => router.push('/')}
            className="w-full text-center py-2.5 text-sm text-red-400 font-semibold bg-red-500/10 hover:bg-red-500/20 rounded-xl transition"
          >
            Sign Out / Home
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Admin Control Center</h2>
            <p className="text-sm text-slate-500 mt-1">Monitor system metrics, manage repair lifecycles, and oversee users.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Customers</span>
              <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{stats.customers}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Vendors</span>
              <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{stats.vendors}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Repairs</span>
              <span className="text-2xl font-extrabold text-blue-600 mt-1 block">{stats.activeRepairs}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
              <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">{stats.completedRepairs}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pending</span>
              <span className="text-2xl font-extrabold text-amber-600 mt-1 block">{stats.pendingRequests}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Revenue</span>
              <span className="text-2xl font-extrabold text-indigo-600 mt-1 block">${stats.totalRevenue}</span>
            </div>
          </div>

          {/* Manage Repairs Table */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Manage System Repairs</h3>
            {loading ? (
              <p className="text-sm text-slate-400">Loading admin metrics...</p>
            ) : repairs.length === 0 ? (
              <p className="text-sm text-slate-400">No repair records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
                      <th className="py-3 px-4">Repair ID</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Device</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {repairs.map((r) => (
                      <tr key={r._id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-extrabold text-emerald-600">{r.repairId || 'N/A'}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{r.title}</td>
                        <td className="py-3 px-4 text-slate-600">{r.deviceType}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full uppercase border border-amber-200/50">
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-extrabold text-slate-800">${r.costEstimate || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}