'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (data.success) {
        // Backend se aane wale dynamic redirectUrl par bhejega (Customer -> /dashboard, Vendor -> /vendor/dashboard, Admin -> /admin/dashboard)
        router.push(data.redirectUrl || '/dashboard');
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Sign in to Fix<span className="text-blue-600">Flow</span></h1>
          <p className="text-sm text-slate-500 mt-1">Enter your credentials to access your portal.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition text-sm"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="text-center pt-2 space-y-2">
          <p className="text-xs text-slate-500">
            Don't have an account? <Link href="/register" className="text-blue-600 font-semibold hover:underline">Register here</Link>
          </p>
          <div>
            <Link href="/" className="text-xs text-slate-400 hover:text-slate-700 font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}