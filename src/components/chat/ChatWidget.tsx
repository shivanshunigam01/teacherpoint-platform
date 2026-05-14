import { useState } from "react";
import { MessageCircle, X, Send, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUICK = ["Find a math tutor", "Best AI courses", "Refund policy", "Become a teacher"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hi! I'm TeacherPoint AI 👋 Ask me about tutors, courses, or anything else." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "user", text }, { from: "bot", text: "Great question! Our team will match you with the right tutor or course shortly. Meanwhile, browse popular courses on the home page." }]);
    setInput("");
  };

  return (
    <>
      <div className="fixed bottom-20 lg:bottom-6 right-4 z-40 flex flex-col gap-2 items-end">
        {open && (
          <div className="w-[340px] h-[480px] bg-card border rounded-2xl shadow-card flex flex-col overflow-hidden">
            <div className="bg-gradient-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white/20 grid place-items-center"><Sparkles className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-semibold">TeacherPoint AI</div>
                  <div className="text-[11px] opacity-80">● Online now</div>
                </div>
              </div>
              <button aria-label="Close chat" onClick={() => setOpen(false)} className="hover:bg-white/10 rounded p-1">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {msgs.map((m, i) => (
                <div key={i} className={`max-w-[85%] text-sm rounded-2xl px-3 py-2 ${m.from === "bot" ? "bg-muted" : "bg-primary text-primary-foreground ml-auto"}`}>
                  {m.text}
                </div>
              ))}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {QUICK.map((q) => (
                  <button key={q} onClick={() => send(q)} className="text-xs px-2.5 py-1 rounded-full border hover:bg-accent">
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t p-2 flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="rounded-full" />
              <Button type="submit" size="icon" className="rounded-full"><Send className="h-4 w-4" /></Button>
            </form>
            <a href="#" className="border-t bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs flex items-center justify-center gap-2 py-2 hover:bg-emerald-500/20">
              <Phone className="h-3.5 w-3.5" /> Connect on WhatsApp
            </a>
          </div>
        )}
        <button
          aria-label="Open chat"
          onClick={() => setOpen(!open)}
          className="h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center shadow-card hover:scale-105 transition"
        >
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </button>
      </div>
    </>
  );
}
