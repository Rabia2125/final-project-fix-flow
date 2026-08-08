'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('available');
  const [requests, setRequests] = useState([]);
  const [bidInputs, setBidInputs] = useState({});
  const [updateInputs, setUpdateInputs] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (data.success) {
        setRequests(data.tasks);
      }
    } catch (err) {
      console.error('Error fetching repair requests:', err);
    }
  };

  const handleBidInputChange = (taskId, field, value) => {
    setBidInputs((prev) => ({
      ...prev,
      [taskId]: {
        ...(prev[taskId] || {}),
        [field]: value,
      },
    }));
  };

  const handleUpdateFieldChange = (taskId, field, value) => {
    setUpdateInputs((prev) => ({
      ...prev,
      [taskId]: {
        ...(prev[taskId] || {}),
        [field]: value,
      },
    }));
  };

  const handleSubmitBid = async (taskId) => {
    const taskBid = bidInputs[taskId];
    if (!taskBid || !taskBid.estimatedCost || !taskBid.estimatedTime) {
      alert('Please enter estimated cost and repair time.');
      return;
    }

    try {
      const res = await fetch('/api/tasks/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId,
          estimatedCost: taskBid.estimatedCost,
          estimatedTime: taskBid.estimatedTime,
          notes: taskBid.notes || '',
          businessName: taskBid.businessName || 'Certified Vendor Lab',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Bid submitted successfully!');
        fetchRequests();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error submitting bid:', err);
    }
  };

  const handleUpdateRepair = async (taskId, payloadOverrides = {}) => {
    const currentInput = updateInputs[taskId] || {};
    const taskObj = requests.find(t => t._id === taskId);
    
    // Combine current inputs with overrides and existing task values as fallback
    const payload = {
      taskId,
      receiveItem: currentInput.receiveItem !== undefined ? currentInput.receiveItem : taskObj?.receiveItem,
      status: currentInput.status !== undefined ? currentInput.status : taskObj?.status,
      deliveryStatus: currentInput.deliveryStatus !== undefined ? currentInput.deliveryStatus : taskObj?.deliveryStatus,
      costEstimate: currentInput.costEstimate !== undefined ? currentInput.costEstimate : taskObj?.costEstimate,
      completionDate: currentInput.completionDate !== undefined ? currentInput.completionDate : taskObj?.completionDate,
      ...payloadOverrides
    };

    try {
      const res = await fetch('/api/tasks/repair-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Repair task updated successfully!');
        fetchRequests();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 hidden md:flex flex-col justify-between shadow-xl">
        <div>
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-extrabold text-white tracking-wide">Fix<span className="text-blue-500">Flow</span></h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Vendor Portal</p>
          </div>
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('available')}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center gap-3 ${
                activeTab === 'available' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>🛠️</span> Repair Management
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
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Repair Management & Bidding Portal</h2>
            <p className="text-sm text-slate-500 mt-1">Review requests, submit bids, update repair status, track item receiving, and finalize completions.</p>
          </div>

          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-medium">
              ✨ {successMsg}
            </div>
          )}

          {requests.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl text-center border border-slate-200/80 shadow-sm">
              <p className="text-slate-400 font-medium">No repair requests available right now.</p>
            </div>
          ) : (
            requests.map((task) => {
              const currentBidInput = bidInputs[task._id] || {};
              const currentUpdateInput = updateInputs[task._id] || {};
              const isAssignedToVendor = task.status === 'Assigned' || task.status === 'Received' || task.status === 'In Progress' || task.status === 'Completed';

              const isReceivedChecked = currentUpdateInput.receiveItem !== undefined ? currentUpdateInput.receiveItem : (task.receiveItem || false);
              const currentStatus = currentUpdateInput.status !== undefined ? currentUpdateInput.status : (task.status || 'Assigned');
              const currentDeliveryStatus = currentUpdateInput.deliveryStatus !== undefined ? currentUpdateInput.deliveryStatus : (task.deliveryStatus || 'Not Dispatched');

              return (
                <div key={task._id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-5 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{task.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md inline-block">
                          Category: {task.category || 'General'}
                        </span>
                        {task.repairId && (
                          <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block border border-emerald-200">
                            Repair ID: {task.repairId}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-200/50">
                      {task.status || 'Pending'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-600 pt-2 border-t border-slate-100">
                    <p><span className="font-semibold text-slate-700">Device Type:</span> {task.deviceType}</p>
                    <p><span className="font-semibold text-slate-700">Delivery:</span> {task.deliveryOption || 'Pickup'}</p>
                    <p><span className="font-semibold text-slate-700">Problem:</span> {task.description}</p>
                  </div>

                  {task.image && (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attachment:</span>
                      <a href={task.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-semibold hover:underline truncate">
                        {task.image}
                      </a>
                    </div>
                  )}

                  {/* Repair Lifecycle Section (Active when assigned/in progress) */}
                  {isAssignedToVendor && (
                    <div className="p-5 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-4">
                      <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider">⚙️ Repair Lifecycle Management</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* 1. Receive Item */}
                        <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2">
                          <span className="font-bold text-slate-700 uppercase">Receive Item</span>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Item Received?</span>
                            <input
                              type="checkbox"
                              checked={isReceivedChecked}
                              onChange={(e) => {
                                handleUpdateFieldChange(task._id, 'receiveItem', e.target.checked);
                                handleUpdateRepair(task._id, { receiveItem: e.target.checked });
                              }}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* 2. Status & Delivery Updates */}
                        <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2">
                          <span className="font-bold text-slate-700 uppercase">Status & Delivery</span>
                          <select
                            value={currentStatus}
                            onChange={(e) => {
                              handleUpdateFieldChange(task._id, 'status', e.target.value);
                              handleUpdateRepair(task._id, { status: e.target.value });
                            }}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                          >
                            <option value="Assigned">Assigned</option>
                            <option value="Received">Received</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <select
                            value={currentDeliveryStatus}
                            onChange={(e) => {
                              handleUpdateFieldChange(task._id, 'deliveryStatus', e.target.value);
                              handleUpdateRepair(task._id, { deliveryStatus: e.target.value });
                            }}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl mt-1"
                          >
                            <option value="Not Dispatched">Not Dispatched</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Ready for Pickup">Ready for Pickup</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>

                        {/* 3. Cost Estimate & Approval */}
                        <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2">
                          <span className="font-bold text-slate-700 uppercase">Cost Estimate ($)</span>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              defaultValue={task.costEstimate}
                              onChange={(e) => handleUpdateFieldChange(task._id, 'costEstimate', Number(e.target.value))}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                            />
                            <button
                              onClick={() => handleUpdateRepair(task._id)}
                              className="bg-blue-600 text-white px-3 py-2 rounded-xl font-bold hover:bg-blue-700"
                            >
                              Save
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-500 block">Approval: <b>{task.customerCostApproval}</b></span>
                        </div>
                      </div>

                      {/* Completion Date & Finalize (Photos removed) */}
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-3">
                        <span className="font-bold text-xs text-slate-700 uppercase">Completion Date & Finalize</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                          <input
                            type="date"
                            defaultValue={task.completionDate ? task.completionDate.split('T')[0] : ''}
                            onChange={(e) => handleUpdateFieldChange(task._id, 'completionDate', e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                          <button
                            onClick={() => handleUpdateRepair(task._id, { status: 'Completed' })}
                            className="w-full bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm"
                          >
                            Mark Repair Completed ✅
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Submit Bid Form Section (When task is still pending/bidding) */}
                  {!isAssignedToVendor && (
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 mt-4">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Submit Your Repair Bid</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Business Name"
                          value={currentBidInput.businessName || ''}
                          onChange={(e) => handleBidInputChange(task._id, 'businessName', e.target.value)}
                          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <input
                          type="number"
                          placeholder="Estimated Cost ($)"
                          value={currentBidInput.estimatedCost || ''}
                          onChange={(e) => handleBidInputChange(task._id, 'estimatedCost', e.target.value)}
                          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <input
                          type="text"
                          placeholder="Estimated Time (e.g. 2 Days)"
                          value={currentBidInput.estimatedTime || ''}
                          onChange={(e) => handleBidInputChange(task._id, 'estimatedTime', e.target.value)}
                          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                      <textarea
                        placeholder="Vendor Notes / Warranty details..."
                        rows="2"
                        value={currentBidInput.notes || ''}
                        onChange={(e) => handleBidInputChange(task._id, 'notes', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      ></textarea>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSubmitBid(task._id)}
                          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition text-sm"
                        >
                          Submit Bid
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}