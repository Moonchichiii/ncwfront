import React, { useState, useRef, useEffect } from 'react';
import { X, MinusCircle, Send } from 'lucide-react';
import { gsap } from 'gsap';
import apiClient from '@api/config';
import chatbotImage from '@assets/images/chatbot.webp';

interface ChatAssistantProps {
    show: boolean;
}

interface Message {
    type: 'user' | 'bot';
    content: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ show }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Enhanced hover animation
    useEffect(() => {
        if (!buttonRef.current) return;
        
        // Initial pulse animation
        gsap.fromTo(
            buttonRef.current,
            { scale: 1 },
            { 
                scale: 1.05, 
                duration: 1.2, 
                repeat: -1, 
                yoyo: true, 
                ease: "elastic.out(1, 0.3)" 
            }
        );

        // Hover effect
        buttonRef.current.addEventListener('mouseenter', () => {
            gsap.to(buttonRef.current, {
                scale: 1.15,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });

        buttonRef.current.addEventListener('mouseleave', () => {
            gsap.to(buttonRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage: Message = { type: 'user', content: message };
        setMessages(prev => [...prev, newMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await apiClient.post('/chatbot/chat/', { message: message.trim() });
            setMessages(prev => [...prev, { type: 'bot', content: response.data.message }]);
        } catch (err) {
            setMessages(prev => [...prev, { type: 'bot', content: 'Error, please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div 
            ref={chatRef} 
            className={`fixed sm:bottom-6 sm:right-6 bottom-4 right-4 z-[9999] transition-all duration-500 ease-in-out 
                ${isOpen ? 'w-[90vw] sm:w-[400px] h-auto' : 'w-16 h-16'}`}
        >
            {!isOpen ? (
                <button 
                    ref={buttonRef}
                    onClick={() => setIsOpen(true)} 
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-light-accent-blue to-light-accent-purple 
                        dark:from-dark-accent-blue dark:to-dark-accent-purple shadow-2xl flex items-center justify-center 
                        transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm"
                    aria-label="Open chat assistant"
                >
                    <img src={chatbotImage} alt="" className="w-20 h-15 object-contain" />
                </button>
            ) : (
                <div className="bg-light-bg-secondary/95 dark:bg-dark-bg-secondary/95 backdrop-blur-md rounded-3xl 
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-light-text-primary/5 
                    dark:border-dark-text-primary/5">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-light-accent-blue to-light-accent-purple 
                        dark:from-dark-accent-blue dark:to-dark-accent-purple">
                        <div className="flex items-center gap-3">
                            <img src={chatbotImage} alt="ChatAssitant image" className="w-10 h-8 object-contain" />
                            <h3 className="text-white font-light text-lg">Nordic Assistant</h3>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="text-white/90 hover:text-white transition-colors p-1 rounded-full 
                                hover:bg-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="p-4 h-[50vh] sm:h-[400px] overflow-y-auto space-y-4 scrollbar-thin 
                        scrollbar-thumb-light-accent-blue dark:scrollbar-thumb-dark-accent-blue scrollbar-track-transparent">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 ${msg.type === 'user' 
                                    ? 'bg-gradient-to-r from-light-accent-blue to-light-accent-purple dark:from-dark-accent-blue dark:to-dark-accent-purple text-white rounded-2xl rounded-br-sm' 
                                    : 'bg-light-bg-primary/50 dark:bg-dark-bg-primary/50 text-light-text-primary dark:text-dark-text-primary rounded-2xl rounded-bl-sm'}`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-light-bg-primary/50 dark:bg-dark-bg-primary/50 p-3 rounded-2xl">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-light-accent-blue dark:bg-dark-accent-blue animate-bounce" />
                                        <div className="w-2 h-2 rounded-full bg-light-accent-blue dark:bg-dark-accent-blue animate-bounce delay-100" />
                                        <div className="w-2 h-2 rounded-full bg-light-accent-blue dark:bg-dark-accent-blue animate-bounce delay-200" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-light-text-primary/5 dark:border-dark-text-primary/5">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <input 
                            type="text" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            className="flex-1 bg-light-bg-primary/50 dark:bg-dark-bg-primary/50 
                                text-light-text-primary dark:text-dark-text-primary 
                                text-sm sm:text-base
                                rounded-full px-4 sm:px-6 py-2.5 sm:py-3
                                focus:outline-none focus:ring-2 focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue
                                placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted
                                placeholder:text-sm sm:placeholder:text-base
                                min-w-0 w-full"
                            placeholder="Type your message..."
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="shrink-0 bg-gradient-to-r from-light-accent-blue to-light-accent-purple 
                                dark:from-dark-accent-blue dark:to-dark-accent-purple text-white 
                                p-2.5 sm:p-3
                                rounded-full hover:shadow-lg transition-all duration-300 
                                disabled:opacity-50 disabled:cursor-not-allowed
                                hover:scale-105 active:scale-95
                                flex items-center justify-center"
                            aria-label="Send message"
                        >
                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </form>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;