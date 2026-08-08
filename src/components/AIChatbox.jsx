'use client';
import { useState } from 'react';

export default function AIChatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Failed to get response.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4 border border-gray-200 mt-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">FixFlow AI Assistant</h2>
      <div className="h-64 overflow-y-auto border border-gray-100 p-3 mb-4 rounded bg-gray-50 flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm self-start">AI is typing...</div>}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about repairs..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
      </form>
    </div>
  );
}