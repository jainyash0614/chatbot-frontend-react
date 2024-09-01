import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Menu } from 'lucide-react';

const MuseumChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [language, setLanguage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim().toLowerCase() === 'hi' && !language) {
      setShowLanguageSelection(true);
      setMessages([...messages, { text: input, isBot: false }]);
      setInput('');
    } else if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        const response = language === 'hindi' 
          ? "आपके संदेश के लिए धन्यवाद। आप कितने टिकट खरीदना चाहेंगे?"
          : "Thank you for your message. How many tickets would you like to purchase?";
        setMessages(prev => [...prev, { text: response, isBot: true }]);
      }, 1000);
    }
  };

  const selectLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setShowLanguageSelection(false);
    const welcomeMessage = selectedLanguage === 'hindi'
      ? "हमारे संग्रहालय में आपका स्वागत है! मैं आपकी टिकट खरीद में कैसे सहायता कर सकता हूँ?"
      : "Welcome to our Museum! How can I assist you with ticket purchases today?";
    setMessages(prev => [...prev, { text: welcomeMessage, isBot: true }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-indigo-600 p-4 text-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold font-serif">Museum Mate: Your Virtual Museum Guide</h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 hover:text-indigo-200 transition-colors duration-300" />
            <Menu className="h-5 w-5 sm:h-6 sm:w-6 hover:text-indigo-200 transition-colors duration-300" />
          </div>
        </div>
      </nav>

      <div className="flex-grow overflow-auto p-4 sm:p-6 container mx-auto max-w-3xl">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.isBot ? 'text-left' : 'text-right'} animate-fade-in-up`}>
            <div className={`inline-block p-3 sm:p-4 rounded-lg shadow-md ${
              message.isBot 
                ? 'bg-white text-gray-800' 
                : 'bg-indigo-500 text-white'
            } max-w-[80%] sm:max-w-[70%]`}>
              {message.text}
            </div>
          </div>
        ))}
        {showLanguageSelection && (
          <div className="text-center my-4 animate-fade-in-up">
            <p className="mb-2 text-gray-700 text-sm sm:text-base">Please select your preferred language:</p>
            <div className="space-x-2 sm:space-x-4">
              <button
                onClick={() => selectLanguage('english')}
                className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-blue-600 transition duration-300"
              >
                English
              </button>
              <button
                onClick={() => selectLanguage('hindi')}
                className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-green-600 transition duration-300"
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 sm:p-6 bg-white border-t shadow-md">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden shadow-inner">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'hindi' ? "यहां अपना संदेश लिखें..." : "Start your conversation by typing hi..."}
              className="flex-grow p-3 sm:p-4 bg-transparent focus:outline-none text-sm sm:text-base"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-indigo-500 text-white p-3 sm:p-4 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              <Send className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-3 sm:p-4 text-center text-sm sm:text-base">
        <p>&copy; 2024 Museum Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MuseumChatbot;
