import React, { useState } from 'react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Assalam-o-Alaikum! Main SmartTools.pk ka AI Assistant hoon. Aapko kis tool (Image, PDF, ya Text) mein madad chahiye?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // User message add karein
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // AI response (Simulated)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'Shukriya! SmartTools.pk par Image Compressor, PDF Merger, QR Generator aur Text Counter pehle se maujood hain. Aap inhein upar diye gaye tabs se use kar saktay hain.' }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform transform hover:scale-110"
          title="Ask AI Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
          {/* Header */}
          <div className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <h3 className="font-bold text-sm">SmartTools AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white font-bold text-xl">&times;</button>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-80 overflow-y-auto space-y-3 text-sm flex flex-col">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[85%] leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-emerald-600 self-end text-white' 
                    : 'bg-gray-800 self-start text-gray-200 border border-gray-700'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-gray-800 border-t border-gray-700 flex items-center space-x-2">
            <input
              type="text5"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Yahan sawal likhein..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleSend}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
