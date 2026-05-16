import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TUTORS } from "@/data/mock";

export const Route = createFileRoute("/messages")({ component: Messages, head: () => ({ meta: [{ title: "Messages · TeachersPoints" }] }) });

function Messages() {
  const [active, setActive] = useState(TUTORS[0]);
  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="font-display font-extrabold text-2xl mb-4">Messages</h1>
      <div className="grid md:grid-cols-[300px_1fr] gap-4 bg-card border rounded-2xl overflow-hidden h-[70vh]">
        <aside className="border-r overflow-y-auto">
          <div className="p-3 border-b">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search…" className="pl-10" /></div>
          </div>
          {TUTORS.slice(0, 8).map((t) => (
            <button key={t.id} onClick={() => setActive(t)} className={`w-full flex items-center gap-3 p-3 hover:bg-muted/40 text-left ${active.id === t.id ? "bg-muted/50" : ""}`}>
              <div className="h-10 w-10 rounded-full grid place-items-center text-white font-bold text-sm shrink-0" style={{ background: t.gradient }}>{t.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{t.name}</div>
                <div className="text-xs text-muted-foreground truncate">Last message preview…</div>
              </div>
            </button>
          ))}
        </aside>
        <div className="flex flex-col">
          <div className="border-b p-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full grid place-items-center text-white font-bold text-sm" style={{ background: active.gradient }}>{active.initials}</div>
            <div><div className="font-semibold text-sm">{active.name}</div><div className="text-xs text-emerald-600">● Online</div></div>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-muted/20">
            <div className="max-w-[70%] bg-card border rounded-2xl rounded-bl-sm p-3 text-sm">Hi! Excited to start our sessions next week.</div>
            <div className="max-w-[70%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm p-3 text-sm ml-auto">Same here! What should I prepare?</div>
            <div className="max-w-[70%] bg-card border rounded-2xl rounded-bl-sm p-3 text-sm">Just bring your textbook and a notebook. I'll handle the rest 👍</div>
          </div>
          <form className="border-t p-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Type a message…" />
            <Button type="submit" size="icon" className="bg-gradient-primary"><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </div>
    </section>
  );
}
