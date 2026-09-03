"use client"

import { useState, useEffect, useRef } from 'react'
import {
  MessageCircle,
  X,
  Send,
  Coffee,
  User,
  Clock,
  CheckCheck,
  ArrowUpRight,
  Calendar,
  Building2,
  MapPin,
  Wifi,
  Users,
  Star,
  Zap,
  Sparkles,
  Info
} from 'lucide-react'

type Message = {
  id: string;
  type: string;
  text: string;
  time: string;
  quickReplies?: boolean;
  status?: string;
  showForm?: boolean;
};

// Quick-action keycaps — the four things people actually come to a coworking chat for
const QUICK_REPLIES = [
  { icon: Calendar, text: "Book a tour" },
  { icon: Zap, text: "Day pass pricing" },
  { icon: MapPin, text: "Find a location" },
  { icon: Sparkles, text: "Membership plans" },
  { icon: MessageCircle, text: "Talk to our team" },
]

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  type: 'bot',
  text: "Hey, I'm Maya — your WorkByHome concierge.\n\nNeed a desk for the day, a private office, or a home base for your whole team? I can help you find the right space in seconds.\n\nWhat can I help with?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  quickReplies: true,
  showForm: false
}

// Condensed stat chips — replaces the old static sidebar
const INFO_CHIPS = [
  { icon: Building2, label: "120+ locations" },
  { icon: Clock, label: "24/7 access" },
  { icon: Wifi, label: "Gig-speed wifi" },
  { icon: Users, label: "5,000+ members" },
]

const NETWORK_CITIES = ["Austin", "Denver", "Chicago", "Miami", "Seattle", "+115 more"]

export default function WorkByHomeChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [showNetworkStrip, setShowNetworkStrip] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Form state - only shown when the AI triggers it
  const [activeFormMessageId, setActiveFormMessageId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [formFields, setFormFields] = useState<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleOpen = () => {
    setShowButton(false)
    setIsAnimating(true)
    setTimeout(() => {
      setIsOpen(true)
      setIsAnimating(false)
    }, 250)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setShowButton(true)
    }, 350)
  }

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
      showForm: false
    };

    const apiMessages = [
      ...messages.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: text },
    ];

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);
    setActiveFormMessageId(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        type: "bot",
        text: data.aiMessage || "I apologize, I couldn't process that request.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickReplies: true,
        showForm: data.isDemo || false
      };

      setMessages((prev) => [...prev, botMessage]);

      if (data.isDemo) {
        setActiveFormMessageId(botMessageId);
        setFormFields(data.formFields || ["name", "email", "phone", "location", "message"]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "Something went wrong. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          quickReplies: true,
          showForm: false
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleDemoSubmit = async () => {
    if (!name || !email || !phone) {
      alert("Please fill all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, location, description }),
      });

      const data = await res.json();

      if (!data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            text: `${data.error || "Failed to submit your tour request. Please try again."}`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            quickReplies: true,
            showForm: false
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          text: "Your tour is booked.\n\nCheck your email for location details and directions.\n\nA member of our team will confirm your time within 24 hours.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          quickReplies: true,
          showForm: false
        },
      ]);

      setActiveFormMessageId(null);
      setName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setDescription("");
      setFormFields([]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          text: "Something went wrong. Please try again or reach us directly at hello@workbyhome.com",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          quickReplies: true,
          showForm: false
        },
      ]);
    }
  };

  const openWhatsApp = () => {
    const phone = "15551234567"
    const message = encodeURIComponent("Hi! I've been chatting with the WorkByHome assistant and have a few questions about your spaces.")
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  // ---------- CLOSED STATE: a simple, sturdy floating tab ----------
  if (showButton && !isOpen) {
    return (
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isAnimating ? 'scale-75 opacity-0 translate-y-3' : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        <button
          onClick={handleOpen}
          className="group relative flex items-center gap-3 pl-3 pr-5 py-3 bg-[#0066cc] rounded-full shadow-[0_10px_30px_rgba(0,102,204,0.45)] hover:shadow-[0_14px_36px_rgba(0,102,204,0.55)] hover:bg-[#0052a3] transition-all duration-200 hover:-translate-y-0.5"
        >
          <span className="relative flex-shrink-0 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
            <Coffee className="w-4.5 h-4.5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0066cc]" />
          </span>
          <span className="text-white font-semibold text-sm leading-tight text-left">
            Ask Maya
            <span className="block text-[10px] font-normal text-blue-100">WorkByHome concierge</span>
          </span>

          {/* notification badge, fully inside the button's bounding box */}
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            1
          </span>
        </button>
      </div>
    )
  }

  // ---------- OPEN STATE: docked bottom-right drawer, no centered modal, no left sidebar ----------
  return (
    <div className={`fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      {/* mobile-only scrim */}
      <div className="sm:hidden absolute inset-0 bg-slate-900/40" onClick={handleClose} />

      <div className={`relative w-full h-full sm:h-[640px] sm:w-[400px] bg-white sm:rounded-[20px] shadow-[0_20px_60px_rgb(0,0,0,0.25)] overflow-hidden flex flex-col border border-slate-200 transition-all duration-300 origin-bottom-right ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-6'
      }`}>

        {/* ===== Header ===== */}
        <div className="bg-gradient-to-r from-[#0066cc] to-[#0052a3] px-4 pt-4 pb-3 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                <Coffee className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0052a3]" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Maya</h3>
                <p className="text-blue-100 text-[11px] font-mono">online · replies &lt; 1 min</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowNetworkStrip((s) => !s)}
                aria-label="Toggle network info"
                className={`p-2 rounded-full transition-colors ${showNetworkStrip ? 'bg-white/25' : 'hover:bg-white/15'}`}
              >
                <Info className="w-4 h-4 text-white" />
              </button>
              <button onClick={handleClose} aria-label="Close" className="p-2 hover:bg-white/15 rounded-full transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* stat chip strip — replaces the old left sidebar features */}
          <div
            className="flex gap-1.5 mt-3 overflow-x-auto -mx-4 px-4 pb-0.5 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {INFO_CHIPS.map((chip) => {
              const Icon = chip.icon
              return (
                <div key={chip.label} className="flex items-center gap-1.5 bg-white/12 border border-white/15 rounded-full px-3 py-1 flex-shrink-0">
                  <Icon className="w-3 h-3 text-blue-100" />
                  <span className="text-[11px] font-medium whitespace-nowrap">{chip.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* collapsible network ticker */}
        {showNetworkStrip && (
          <div
            className="flex-shrink-0 bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono flex-shrink-0">Live network</span>
            {NETWORK_CITIES.map((city) => (
              <span key={city} className="text-[11px] text-slate-600 bg-white border border-slate-200 rounded-full px-2.5 py-0.5 flex-shrink-0">
                {city}
              </span>
            ))}
          </div>
        )}

        {/* ===== Messages ===== */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 max-w-[86%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.type === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-[#0066cc] flex items-center justify-center flex-shrink-0 mb-1">
                      <Coffee className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  {msg.type === 'bot' ? (
                    // ticket-stub bubble: dashed perforation edge on the left
                    <div className="relative bg-white rounded-r-xl rounded-bl-xl border border-slate-200 pl-4 pr-4 py-3 text-sm text-slate-800 leading-relaxed shadow-sm">
                      <div className="absolute left-0 top-0 bottom-0 border-l-2 border-dashed border-blue-200" />
                      <div className="whitespace-pre-line">{msg.text}</div>
                      <div className="mt-1.5 text-[10px] font-mono text-slate-400">{msg.time}</div>
                    </div>
                  ) : (
                    <div className="bg-[#0066cc] text-white rounded-l-xl rounded-br-xl px-4 py-3 text-sm leading-relaxed shadow-sm">
                      <div className="whitespace-pre-line">{msg.text}</div>
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-blue-100 justify-end">
                        <span>{msg.time}</span>
                        <CheckCheck className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* one-time review stub, shown under the welcome message only */}
              {msg.id === 'welcome' && (
                <div className="ml-9 mt-2 max-w-[86%] bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2">
                  <div className="flex text-amber-500 flex-shrink-0 mt-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-500" />)}
                  </div>
                  <p className="text-[11px] text-amber-800 leading-snug">
                    Booked a desk in a new city in two minutes flat, no lease, no hassle.
                    <span className="text-amber-600 font-medium"> — Priya M., Austin</span>
                  </p>
                </div>
              )}

              {/* Tour booking form, attached to the message that triggered it */}
              {msg.type === 'bot' && activeFormMessageId === msg.id && (
                <div className="ml-9 mt-2 max-w-[86%] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-300" />
                    <span className="text-white text-xs font-bold tracking-wide">BOOK A TOUR</span>
                  </div>
                  <div className="p-3.5 space-y-2.5">
                    {formFields.includes("name") && (
                      <input
                        type="text"
                        placeholder="Name *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2.5 border-b-2 border-slate-200 text-sm focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                      />
                    )}
                    {formFields.includes("email") && (
                      <input
                        type="email"
                        placeholder="Email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 border-b-2 border-slate-200 text-sm focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                      />
                    )}
                    {formFields.includes("phone") && (
                      <input
                        type="tel"
                        placeholder="Phone *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 border-b-2 border-slate-200 text-sm focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                      />
                    )}
                    {formFields.includes("location") && (
                      <input
                        type="text"
                        placeholder="Preferred location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2.5 border-b-2 border-slate-200 text-sm focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                      />
                    )}
                    {formFields.includes("message") && (
                      <textarea
                        placeholder="Day pass, private office, dedicated desk..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={2}
                        className="w-full p-2.5 border-b-2 border-slate-200 text-sm resize-none focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                      />
                    )}
                    <button
                      onClick={handleDemoSubmit}
                      className="w-full bg-[#0066cc] hover:bg-[#0052a3] text-white text-sm font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-1"
                    >
                      Request tour
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0066cc] flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white rounded-r-xl rounded-bl-xl border border-slate-200 px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick actions — keycap row, scrolls instead of leaving an uneven grid remainder */}
          {messages[messages.length - 1]?.quickReplies && !isTyping && !activeFormMessageId && (
            <div
              className="flex gap-1.5 pt-1 overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {QUICK_REPLIES.map((reply) => {
                const Icon = reply.icon
                return (
                  <button
                    key={reply.text}
                    onClick={() => handleSendMessage(reply.text)}
                    className="flex flex-col items-center justify-center gap-1 bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-center hover:border-[#0066cc] hover:bg-blue-50/50 transition-colors shadow-sm flex-shrink-0 w-[86px]"
                  >
                    <Icon className="w-4 h-4 text-[#0066cc]" />
                    <span className="text-[10px] font-medium text-slate-600 leading-tight">{reply.text}</span>
                  </button>
                )
              })}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ===== Input ===== */}
        <div className="flex-shrink-0 bg-white border-t border-slate-200 p-3">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about locations, pricing..."
              className="flex-1 px-4 py-2.5 bg-slate-100 rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/25 transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="w-9 h-9 flex-shrink-0 bg-[#0066cc] text-white rounded-full flex items-center justify-center hover:bg-[#0052a3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={openWhatsApp}
            className="w-full mt-2 flex items-center justify-center gap-1.5 text-[11px] text-emerald-600 font-medium py-1 hover:text-emerald-700 transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            Prefer a human? Continue on WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}