
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Info, Image, Gift, Smile, Send } from 'lucide-react';
import { Message } from '../types';

interface ChatRoomViewProps {
  chatId: string;
  onBack: () => void;
}

const ChatRoomView: React.FC<ChatRoomViewProps> = ({ chatId, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'other', text: 'Hey there! How is the project going?', timestamp: '10:30 AM' },
    { id: '2', senderId: 'me', text: 'It is going great! Almost finished the mobile app UI.', timestamp: '10:32 AM' },
    { id: '3', senderId: 'other', text: 'Awesome, can’t wait to see it! 😍', timestamp: '10:33 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header */}
      <header className="sticky top-0 bg-black/80 backdrop-blur-md z-40 p-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-sm leading-tight">Tech Insider</h2>
            <p className="text-xs text-gray-500">@tech_news</p>
          </div>
        </div>
        <button className="p-1 hover:bg-white/10 rounded-full">
          <Info className="w-5 h-5" />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.senderId === 'me' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                msg.senderId === 'me' 
                  ? 'bg-sky-500 text-white rounded-br-sm' 
                  : 'bg-gray-800 text-white rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-gray-500 mt-1">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2 bg-gray-900/50 rounded-2xl px-3 py-1">
          <div className="flex gap-2 text-sky-500">
            <Image className="w-5 h-5 cursor-pointer" />
            <Gift className="w-5 h-5 cursor-pointer" />
          </div>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Start a new message" 
            className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-white"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`${inputText.trim() ? 'text-sky-500' : 'text-sky-500/50'}`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomView;
