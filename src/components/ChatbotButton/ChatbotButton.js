import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Smile } from 'lucide-react';

import { chatbotService } from '~/services';

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const bottomRef = useRef(null); // ref để scroll tới tin nhắn cuối

    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = await chatbotService.sendMessage({ message });
            setMessages((prev) => [...prev, newMessage.result]);
            setMessage(''); // Clear input after sending
            setIsOpen(true); // Ensure chat is open after sending
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Ho_Chi_Minh', // 👈 Múi giờ Việt Nam
        });
    };

    function formatBoldJSX(text) {
        const parts = text.split(/(\*\*.*?\*\*)/); // Tách thành đoạn có ** và không **
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                const content = part.slice(2, -2);
                const capitalized = content.charAt(0).toUpperCase() + content.slice(1);
                return <strong key={index}>{capitalized}</strong>;
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await chatbotService.getMessageHistory();
                console.log('Fetched messages:', response.result);
                setMessages(response.result.reverse() || []);
            } catch (error) {
                console.error('Failed to load chat history', error);
            }
        };

        if (isOpen && messages.length === 0) {
            fetchMessages();
        }
    }, [isOpen]); // 👈 chỉ chạy khi isOpen thay đổi

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Scroll khi mở chat
    useEffect(() => {
        if (isOpen) {
            setTimeout(scrollToBottom, 100); // delay nhẹ để DOM sẵn sàng
        }
    }, [isOpen]);

    return (
        <>
            {/* Chat Button */}
            <div
                className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
                    isOpen ? 'scale-95' : 'scale-100 hover:scale-110'
                }`}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center justify-center"
                >
                    {isOpen ? (
                        <X className="w-12 h-12 group-hover:rotate-90 transition-transform duration-300" />
                    ) : (
                        <MessageCircle className="w-12 h-12 group-hover:rotate-12 transition-transform duration-300" />
                    )}
                </button>
            </div>

            {/* Chat Popup */}
            {isOpen && (
                <div className="fixed bottom-32 right-24 w-[300px]  bg-white rounded-2xl shadow-2xl z-40 border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 text-white">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-lg font-semibold">C</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Chatbot</h3>
                                <p className="text-md text-white/80">Online now</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[300px]">
                        {messages.map((item) => (
                            <React.Fragment key={item.id}>
                                {/* User message (hiển thị bên phải) */}
                                {item.message && (
                                    <div className="flex justify-end mb-2">
                                        <div className="max-w-xs px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                                            <p className="text-md">{item.message}</p>
                                            <p className="text-sm mt-1 text-white/70">{formatTime(item.createdAt)}</p>
                                        </div>
                                    </div>
                                )}
                                {/* Bot response (hiển thị bên trái) */}
                                {item.response && (
                                    <div className="flex justify-start mb-2">
                                        <div className="max-w-xs px-4 py-2 rounded-2xl bg-gray-100 text-gray-800">
                                            <p className="text-md whitespace-pre-wrap">
                                                {formatBoldJSX(item.response)}
                                            </p>
                                            <p className="text-sm mt-1 text-gray-500">{formatTime(item.createdAt)}</p>
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} /> {/* Scroll target */}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                            <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
                                <Smile className="w-5 h-5" />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type a message..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                                />
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!message.trim()}
                                className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default ChatButton;
