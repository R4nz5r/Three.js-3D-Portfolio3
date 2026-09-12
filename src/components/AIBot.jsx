import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IoChatbubbleEllipses,
  IoClose,
  IoSend,
  IoSparkles,
  IoRefreshOutline,
  IoArrowDownOutline,
  IoDocumentTextOutline,
  IoMailOutline,
  IoOpenOutline,
} from "react-icons/io5";
import { sendChatMessage } from "../lib/gemini";
import { BOT_NAME } from "../constants/aiKnowledge";

const QUICK_PROMPTS = [
  { label: "💼 Top Skills & Tech", query: "What are Ragib's top technical skills and stack?" },
  { label: "🚀 Featured AI Projects", query: "Tell me about Ragib's AI projects like Vertex and Timely Forms AI." },
  { label: "🛡️ Work Experience", query: "Can you summarize Ragib's career and engineering experience?" },
  { label: "📬 How to Hire / Contact", query: "How can I get in touch with Ragib for work or freelance opportunities?" },
];

const INITIAL_MESSAGE = {
  role: "model",
  text: `Hello! I'm **${BOT_NAME}**, Ragib's AI digital assistant. 

I can answer questions about his technical background, projects, work experience, or help you get in touch. 

What would you like to know?`,
  actions: [
    { id: "skills", label: "💼 View Skills", type: "scroll", target: "#about" },
    { id: "projects", label: "🚀 View Projects", type: "scroll", target: "#work" },
    { id: "contact", label: "📬 Contact Ragib", type: "scroll", target: "#contact" },
  ],
};

const AIBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll messages to bottom
  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  // Handle action button clicks (scroll, download, external link)
  const handleActionClick = (action) => {
    if (action.type === "scroll" && action.target) {
      let el = document.querySelector(action.target);
      if (!el && action.target === "#projects") el = document.querySelector("#work");
      if (!el && action.target === "#work") el = document.querySelector("#projects");
      if (!el && action.target === "#skills") el = document.querySelector("#about");

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (action.type === "download") {
      const link = document.createElement("a");
      link.href = action.target;
      link.download = "Ragib_Shahrier_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action.type === "link") {
      window.open(action.target, "_blank", "noopener,noreferrer");
    }
  };

  // Submit message
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput("");

    // Add user message to state
    const newHistory = [...messages, { role: "user", text: query }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(messages, query);
      const replyText = reply?.text || reply?.cleanText || "Sorry, I couldn't generate a response. Please ask again.";
      setMessages((prev) => [
        ...prev,
        { role: "model", text: replyText, actions: reply?.actions || [] },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I encountered an issue connecting to the AI service. Please try asking again in a moment.",
          actions: [
            { id: "projects", label: "🚀 Browse Projects", type: "scroll", target: "#work" },
            { id: "contact", label: "📬 Contact Section", type: "scroll", target: "#contact" },
          ],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat
  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Simple Markdown parser for bold, bullet points, and inline links
  const renderFormattedText = (rawText = "") => {
    if (!rawText || typeof rawText !== "string") return null;
    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      // Bullet lines
      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*");
      const cleanLine = isBullet ? line.trim().replace(/^([•\-*]\s*)/, "") : line;

      // Parse bold **text** and markdown links [text](url)
      const parts = [];
      const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
      let lastIndex = 0;
      let match;

      while ((match = tokenRegex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, match.index));
        }
        const token = match[0];
        if (token.startsWith("**") && token.endsWith("**")) {
          parts.push(
            <strong key={`${idx}-${match.index}`} className="text-white font-semibold">
              {token.slice(2, -2)}
            </strong>
          );
        } else if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
          const splitIdx = token.indexOf("](");
          const linkLabel = token.slice(1, splitIdx);
          const linkUrl = token.slice(splitIdx + 2, -1);
          parts.push(
            <a
              key={`${idx}-${match.index}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-aqua hover:underline inline-flex items-center gap-0.5"
            >
              {linkLabel} <IoOpenOutline className="text-xs inline" />
            </a>
          );
        }
        lastIndex = tokenRegex.lastIndex;
      }
      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-aqua text-xs mt-1.5">•</span>
            <span className="text-neutral-200 text-sm leading-relaxed">{parts.length > 0 ? parts : cleanLine}</span>
          </div>
        );
      }

      if (cleanLine.trim() === "") {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 text-neutral-200 text-sm leading-relaxed">
          {parts.length > 0 ? parts : cleanLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button (Native button: zero JS transform on fixed anchor) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
          }}
          aria-label="Open Ranzer AI Assistant"
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,1.25rem))] right-4 sm:bottom-7 sm:right-7 z-[9999] p-[1.5px] rounded-full bg-gradient-to-r from-royal via-aqua to-lavender shadow-lg shadow-royal/40 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 select-none touch-manipulation"
        >
          <div className="relative flex items-center justify-center size-9 sm:size-10 rounded-full bg-midnight/95 backdrop-blur-md text-white transition-all hover:bg-midnight/70">
            <IoChatbubbleEllipses className="text-white text-sm sm:text-base" />
            <IoSparkles className="absolute top-1.5 right-1.5 text-aqua text-[9px] sm:text-[10px] animate-pulse" />

            {/* Glowing online indicator */}
            {hasUnread && (
              <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aqua opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2.5 bg-aqua border-2 border-midnight"></span>
              </span>
            )}
          </div>
        </button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-x-3 bottom-[max(1rem,env(safe-area-inset-bottom,1rem))] sm:inset-auto sm:bottom-6 sm:right-6 z-[9999] flex justify-end pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto w-full sm:w-[380px] max-w-[390px] h-[520px] max-h-[75vh] sm:max-h-[80vh] flex flex-col rounded-2xl bg-midnight/95 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 overflow-hidden"
            >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-storm/60 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center size-9 rounded-full bg-gradient-to-tr from-royal to-aqua p-0.5 shadow-md shadow-royal/30">
                  <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                    <IoSparkles className="text-aqua text-base" />
                  </div>
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-mint border-2 border-midnight" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold text-white">{BOT_NAME}</h3>
                  </div>
                  <p className="text-[11px] text-neutral-400">Ragib&apos;s Portfolio Assistant</p>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <IoRefreshOutline size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <IoClose size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-hide">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-royal to-indigo text-white rounded-br-none shadow-md shadow-royal/20"
                        : "bg-white/5 border border-white/10 text-neutral-100 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>

                  {/* Interactive Action Pills */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.actions.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => handleActionClick(act)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-storm/80 hover:bg-royal/60 border border-white/10 text-aqua hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing / Loading Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-neutral-400 text-xs py-1 px-3 bg-white/5 border border-white/10 rounded-2xl rounded-bl-none w-fit">
                  <span className="text-aqua">{BOT_NAME} is thinking</span>
                  <span className="flex gap-1">
                    <span className="size-1.5 bg-aqua rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="size-1.5 bg-aqua rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="size-1.5 bg-aqua rounded-full animate-bounce"></span>
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips (when few messages) */}
            {messages.length <= 3 && !isLoading && (
              <div className="px-3 py-2 border-t border-white/5 bg-storm/20">
                <p className="text-[11px] text-neutral-400 mb-1.5 px-1 font-medium">Suggested questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt.query)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-storm/40 border-t border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Ragib's skills, projects..."
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/10 focus:border-aqua/50 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-gradient-to-tr from-royal to-aqua text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-royal/30 cursor-pointer shrink-0"
              >
                <IoSend size={15} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
);
};

export default AIBot;
