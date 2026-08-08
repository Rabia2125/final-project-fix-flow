'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('requests');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [category, setCategory] = useState('Mobile');
  const [description, setDescription] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('Pickup');
  const [imageFile, setImageFile] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // AI Chat States for Groq API Integration
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your FixFlow AI Repair Assistant powered by Groq. Describe your device issue below, and I will help you diagnose it!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (activeTab === 'ai-assistant') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, deviceType, category, description, deliveryOption, image: imageFile }),
      });

      const data = await res.json();
      if (data.success) {
        setTitle('');
        setDeviceType('');
        setDescription('');
        setImageFile('');
        setSuccessMsg('Repair request created successfully!');
        fetchTasks();
      }
    } catch (err) {
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || aiLoading) return;

    const userMsg = inputMessage;
    setInputMessage('');
    const updatedMessages = [...chatMessages, { role: 'user', content: userMsg }];
    setChatMessages(updatedMessages);
    setAiLoading(true);

    try {
      // Corrected URL matching the /api/ai/chat folder structure
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();

      if (data.success) {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: data.reply || 'Sorry, I encountered an error connecting to Groq AI.' }]);
      }
    } catch (err) {
      console.error('AI Chat Error:', err);
      setChatMessages((prev) => [...prev, { role: 'assistant', content: 'Network error. Please try again.' }]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAcceptBid = async (taskId, bidId) => {
    try {
      const res = await fetch('/api/tasks/accept-bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, bidId }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Bid accepted successfully! Repair ID: ${data.repairId}`);
        fetchTasks();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error accepting bid:', err);
    }
  };

  const handleCostApproval = async (taskId, approvalStatus) => {
    try {
      const res = await fetch('/api/tasks/repair-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, customerCostApproval: approvalStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Cost estimate ${approvalStatus} successfully!`);
        fetchTasks();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error updating approval:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 hidden md:flex flex-col justify-between shadow-xl">
        <div>
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-extrabold text-white tracking-wide">Fix<span className="text-blue-500">Flow</span></h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Customer Portal</p>
          </div>
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('requests')}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center gap-3 ${
                activeTab === 'requests' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>📦</span> Repair Requests & Bids
            </button>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center gap-3 ${
                activeTab === 'ai-assistant' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>🤖</span> AI Assistant
            </button>
            <button
              onClick={() => router.push('/track')}
              className="w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center gap-3 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <span>🔍</span> Track Repair
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
        <div className="space-y-8 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {activeTab === 'requests' ? 'My Repair Requests & Lifecycle Tracking' : 'AI Repair Assistant (Groq Live Chat)'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {activeTab === 'requests' ? 'Track your repair status, cost estimates, completion dates, and delivery updates.' : 'Chat live with your Groq-powered AI assistant for instant device diagnostics.'}
            </p>
          </div>

          {activeTab === 'ai-assistant' ? (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 flex flex-col h-[600px]">
              {/* Chat Messages Container */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md px-4 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-500 px-4 py-3 rounded-2xl rounded-bl-none text-sm italic">
                      Groq AI is thinking...
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 flex gap-3 bg-white rounded-b-3xl">
                <input
                  type="text"
                  placeholder="Ask about your device issue (e.g. phone won't turn on)..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition text-sm"
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            <>
              {successMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-medium">
                  ✨ {successMsg}
                </div>
              )}

              {/* Create Request Form */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Create New Repair Request</h3>
                <form onSubmit={handleCreateTask} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="Repair Title (e.g., Screen Fix)"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                      type="text"
                      placeholder="Device Type (e.g., iPhone 13)"
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Mobile">Mobile Repair</option>
                      <option value="Laptop">Laptop Repair</option>
                      <option value="Appliance">Appliance Repair</option>
                    </select>
                    <select
                      value={deliveryOption}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Pickup">Vendor Pickup</option>
                      <option value="Dropoff">Customer Drop-off</option>
                      <option value="Onsite">On-site Repair</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Image URL / Attachment link"
                    value={imageFile}
                    onChange={(e) => setImageFile(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <textarea
                    rows="3"
                    placeholder="Problem description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition text-sm"
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </div>

              {/* Tasks & Bids Comparison List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Your Requests & Repair Lifecycle</h3>
                {tasks.length === 0 ? (
                  <div className="bg-white p-10 rounded-3xl text-center border border-slate-200/80 shadow-sm">
                    <p className="text-slate-400 font-medium">No repair requests found.</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div key={task._id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg text-slate-900">{task.title}</h4>
                          <div className="flex gap-2 mt-1">
                            {task.repairId && (
                              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block border border-emerald-200">
                                Repair ID: {task.repairId}
                              </span>
                            )}
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md inline-block">
                              Delivery: {task.deliveryStatus || 'Not Dispatched'}
                            </span>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-200/50">
                          {task.status}
                        </span>
                      </div>

                      <div className="text-sm text-slate-600">
                        <p><span className="font-semibold">Device:</span> {task.deviceType} | <span className="font-semibold">Issue:</span> {task.description}</p>
                      </div>

                      {/* Cost Estimate & Completion Date Display for Customer */}
                      {(task.costEstimate > 0 || task.completionDate) && (
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="font-bold text-slate-700 uppercase block">Cost Estimate</span>
                            <span className="text-blue-600 font-extrabold text-sm">${task.costEstimate}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700 uppercase block">Completion Date</span>
                            <span className="text-slate-800 font-semibold">{task.completionDate ? new Date(task.completionDate).toLocaleDateString() : 'TBD'}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700 uppercase block">Cost Approval</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${task.customerCostApproval === 'Approved' ? 'bg-emerald-100 text-emerald-700' : task.customerCostApproval === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                {task.customerCostApproval || 'Pending'}
                              </span>
                              {task.customerCostApproval === 'Pending' && (
                                <div className="flex gap-1">
                                  <button onClick={() => handleCostApproval(task._id, 'Approved')} className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">Approve</button>
                                  <button onClick={() => handleCostApproval(task._id, 'Rejected')} className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">Reject</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Customer Review Section (Active when Completed) */}
                      {task.status === 'Completed' && (
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                          <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">⭐ Rate Your Repair Experience</h5>
                          {task.rating ? (
                            <div className="text-sm text-slate-700 space-y-1">
                              <p><strong>Rating:</strong> {task.rating} / 5 Stars</p>
                              {task.review && <p><strong>Review:</strong> "{task.review}"</p>}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex gap-2">
                                <select 
                                  id={`rating-${task._id}`} 
                                  className="p-2 bg-white border border-slate-200 rounded-xl text-xs"
                                >
                                  <option value="5">5 - Excellent</option>
                                  <option value="4">4 - Good</option>
                                  <option value="3">3 - Average</option>
                                  <option value="2">2 - Poor</option>
                                  <option value="1">1 - Terrible</option>
                                </select>
                                <input 
                                  type="text" 
                                  id={`review-text-${task._id}`} 
                                  placeholder="Write your review..." 
                                  className="flex-1 p-2 bg-white border border-slate-200 rounded-xl text-xs"
                                />
                                <button
                                  onClick={async () => {
                                    const rating = document.getElementById(`rating-${task._id}`).value;
                                    const review = document.getElementById(`review-text-${task._id}`).value;
                                    
                                    try {
                                      const res = await fetch('/api/tasks/review', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ taskId: task._id, rating: Number(rating), review }),
                                      });
                                      const data = await res.json();
                                      if (data.success) {
                                        alert('Review submitted successfully!');
                                        fetchTasks();
                                      } else {
                                        alert(data.message);
                                      }
                                    } catch (err) {
                                      console.error('Error submitting review:', err);
                                    }
                                  }}
                                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700"
                                >
                                  Submit Review
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Multiple Vendor Bids Comparison Section */}
                      {task.bids && task.bids.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                          <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Compare Vendor Bids ({task.bids.length})</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {task.bids.map((bid) => (
                              <div key={bid._id} className={`p-4 rounded-2xl border ${bid.status === 'Accepted' ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'} space-y-2`}>
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-sm text-slate-900">{bid.businessName || 'Vendor'}</span>
                                  <span className="text-blue-600 font-extrabold text-sm">${bid.estimatedCost}</span>
                                </div>
                                <p className="text-xs text-slate-600"><span className="font-semibold">Time:</span> {bid.estimatedTime}</p>
                                {bid.notes && <p className="text-xs text-slate-500 italic">"{bid.notes}"</p>}
                                
                                {task.status !== 'Assigned' && task.status !== 'Received' && task.status !== 'In Progress' && task.status !== 'Completed' && (
                                  <button
                                    onClick={() => handleAcceptBid(task._id, bid._id)}
                                    className="w-full mt-2 bg-emerald-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                                  >
                                    Accept Bid & Assign
                                  </button>
                                )}
                                {bid.status === 'Accepted' && (
                                  <span className="block text-center text-xs font-bold text-emerald-700 uppercase mt-2">Bid Accepted</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}