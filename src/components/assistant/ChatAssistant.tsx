import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, MinusCircle } from 'lucide-react';
import { gsap } from '@lib/gsap';
import { Draggable } from 'gsap/Draggable';
import apiClient from '@api/config';
import chatbotImage from '@/assets/images/chatbot.webp';

gsap.registerPlugin(Draggable);

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
    const draggableInstanceRef = useRef<Draggable | null>(null);

    // Initialize and handle GSAP animations
    const initializeGSAP = useCallback(() => {
        if (!chatRef.current) return;

        // Reset any existing GSAP animations
        gsap.killTweensOf(chatRef.current);
        
        // Set initial position and make visible
        gsap.set(chatRef.current, {
            x: window.innerWidth - 100,
            y: window.innerHeight - 100,
            opacity: 0,
            display: 'block'
        });

        // Animate visibility
        if (show) {
            gsap.to(chatRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.inOut'
            });
        }

        // Initialize Draggable only once
        if (!draggableInstanceRef.current) {
            draggableInstanceRef.current = Draggable.create(chatRef.current, {
                type: "x,y",
                bounds: window,
                inertia: true,
                onClick: () => {
                    if (!isOpen) setIsOpen(true);
                }
            })[0];
        }
    }, [show, isOpen]);

    useEffect(() => {
        initializeGSAP();
        
        return () => {
            if (draggableInstanceRef.current) {
                draggableInstanceRef.current.kill();
                draggableInstanceRef.current = null;
            }
        };
    }, [initializeGSAP]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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
            const response = await apiClient.post('/chatbot/chat/', {
                message: message.trim()
            });

            setMessages(prev => [...prev, {
                type: 'bot',
                content: response.data.message
            }]);
        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div
            ref={chatRef}
            className={`fixed z-[9999] ${isOpen ? 'w-80' : 'w-12'} transition-all duration-300`}
            style={{ display: 'none' }}
        >
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-12 h-12 rounded-full bg-light-accent-blue dark:bg-dark-accent-blue text-white flex items-center justify-center hover:bg-light-accent-purple dark:hover:bg-dark-accent-purple transition-colors overflow-hidden shadow-lg"
                >
                    <img 
                        src={chatbotImage}
                        alt="Chat Assistant"
                        className="w-180 h-180 object-contain"
                    />
                </button>
            ) : (
                <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-light-accent-blue dark:bg-dark-accent-blue p-4 flex items-center justify-between cursor-move">
                        <div className="flex items-center gap-2">
                            <img 
                                src={chatbotImage}
                                alt="Chat Assistant"
                                className="w-6 h-6 object-contain"
                            />
                            <h3 className="text-white font-light">Nordic Assistant</h3>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="text-white hover:text-light-bg-secondary transition-colors"
                            >
                                <MinusCircle className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-light-bg-secondary transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-light-bg-primary dark:bg-dark-bg-primary">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${
                                            msg.type === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-lg ${
                                                msg.type === 'user'
                                                    ? 'bg-light-accent-blue dark:bg-dark-accent-blue text-white'
                                                    : 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary'
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary p-3 rounded-lg">
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

                            <form onSubmit={handleSubmit} className="p-4 border-t border-light-text-primary/10 dark:border-dark-text-primary/10">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-light-bg-tertiary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-light-accent-blue dark:bg-dark-accent-blue text-white px-4 py-2 rounded-lg hover:bg-light-accent-purple dark:hover:bg-dark-accent-purple transition-colors disabled:opacity-50"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;