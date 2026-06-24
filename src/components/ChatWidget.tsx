"use client";

import { useState, useRef, useEffect } from "react";

// Public pre-booking assistant. Talks to the concierge service's /chat endpoint
// (property facts only — no guest data). Floating button, bottom-left so it
// doesn't collide with the Text Us button (bottom-right).
const CHAT_URL =
  (process.env.NEXT_PUBLIC_CONCIERGE_URL ??
    "https://guest-concierge.cottagecreators.ca") + "/chat";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! 👋 I can answer questions about our Muskoka cottages — amenities, the area, pets, parking and more. What would you like to know?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          // send recent turns (exclude the canned greeting) for context
          history: next.slice(1, -1).slice(-6),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { reply: string };
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble right now. Please reach us at cottagecreators.ca/contact-us and we'll help you out!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-pine text-bone pl-4 pr-5 py-3.5 rounded-full shadow-lg hover:bg-pine-deep transition-transform hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 3C6.5 3 2 6.58 2 11c0 2.18 1.1 4.15 2.9 5.6L4 21l4.7-1.55C9.74 19.8 10.85 20 12 20c5.5 0 10-3.58 10-8s-4.5-9-10-9z" />
          </svg>
          <span className="font-medium text-sm">Ask a question</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col w-[min(92vw,22rem)] h-[min(70vh,32rem)] bg-bone rounded-2xl shadow-2xl border border-edge overflow-hidden">
          <div className="flex items-center justify-between bg-pine text-bone px-4 py-3">
            <span className="font-medium text-sm">CottageCreators Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/80 hover:text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-cream">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed " +
                    (m.role === "user"
                      ? "bg-pine text-bone rounded-br-sm"
                      : "bg-bone text-ink border border-edge rounded-bl-sm")
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-bone border border-edge rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-muted text-sm">
                  …
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-edge p-2 flex gap-2 bg-bone">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about the cottages…"
              className="flex-1 px-3 py-2 text-sm rounded-full border border-edge focus:outline-none focus:ring-2 focus:ring-clay/40"
              maxLength={1000}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-clay text-bone px-4 rounded-full text-sm font-medium disabled:opacity-40 hover:bg-clay-dark"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
