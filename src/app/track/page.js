'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrackRepairPage() {
  const [repairIdInput, setRepairIdInput] = useState('');
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!repairIdInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setTask(null);

    try {
      const res = await fetch(`/api/tasks/track?repairId=${repairIdInput.trim()}`);
      const data = await res.json();
      if (data.success) {
        setTask(data.task);
      } else {
        setErrorMsg(data.message || 'Repair task not found.');
      }
    } catch (err) {
      console.error('Error tracking repair:', err);
      setErrorMsg('An error occurred while tracking the repair.');
    } finally {
      setLoading(false);
    }
  };

  // Helper for progress calculation based on status
  const getProgressPercentage = (status) => {
    switch (status) {
      case 'Pending': return 10;
      case 'Bidding': return 25;
      case 'Assigned': return 40;
      case 'Received': return 60;
      case 'In Progress': return 80;
      case 'Completed': return 100;
      default: return 10;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <div className="max-w-3xl w-full mx-auto p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Track Your Repair</h1>
            <p className="text-sm text-slate-500 mt-1">Enter your unique Repair ID to check real-time progress and status.</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
          >
            ← Back to Home
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80">
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Repair ID (e.g., REP-94821)"
              value={repairIdInput}
              onChange={(e) => setRepairIdInput(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition text-sm"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>
          {errorMsg && <p className="text-xs text-red-600 font-medium mt-3">⚠️ {errorMsg}</p>}
        </div>

        {/* Repair Details Result */}
        {task && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Repair ID: {task.repairId}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{task.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Device: <span className="font-semibold text-slate-700">{task.deviceType}</span></p>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-200/50">
                {task.status}
              </span>
            </div>

            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span>Progress Indicator</span>
                <span>{getProgressPercentage(task.status)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-500 rounded-full" 
                  style={{ width: `${getProgressPercentage(task.status)}%` }}
                ></div>
              </div>
            </div>

            {/* Repair Timeline */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">⏳ Repair Timeline & Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                <p><span className="font-semibold text-slate-700">Current Status:</span> {task.status}</p>
                <p><span className="font-semibold text-slate-700">Delivery Status:</span> {task.deliveryStatus || 'Not Dispatched'}</p>
                <p><span className="font-semibold text-slate-700">Item Received:</span> {task.receiveItem ? 'Yes ✅' : 'No ❌'}</p>
                <p><span className="font-semibold text-slate-700">Completion Date:</span> {task.completionDate ? new Date(task.completionDate).toLocaleDateString() : 'TBD'}</p>
              </div>
            </div>

            {/* Cost Information */}
            <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">Cost Information</span>
                <span className="text-xl font-extrabold text-blue-600">${task.costEstimate || 0}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Customer Approval</span>
                <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold inline-block mt-1 ${task.customerCostApproval === 'Approved' ? 'bg-emerald-100 text-emerald-700' : task.customerCostApproval === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                  {task.customerCostApproval || 'Pending'}
                </span>
              </div>
            </div>

            {/* Repair Photos / Attachments */}
            {task.image && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 uppercase">Original Attachment / Image</span>
                <a href={task.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs font-semibold hover:underline truncate max-w-xs">
                  {task.image}
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-100 mt-10">
        FixFlow &copy; 2026 - All Rights Reserved
      </footer>
    </div>
  );
}